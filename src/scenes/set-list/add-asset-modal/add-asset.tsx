import { IAddAssetRequest, SetModel } from '../../../models/set';
import { AvailableAssetCollection, AvailableAssetModel } from '../../../models/ressources/asset';
import { useState } from 'react';
import ressources from '../../../models/ressources';
import Button from '../../../components/button';
import { AssetCollection, AssetModel } from '../../../models/asset';
import { showAlertMessage } from '../../../constants/msg';
import DropdownAlert from '../../../components/dropdown-alert';
import Select from 'react-select';
import selectStyle from '../../../components/select-style';


interface IProps {
    set: SetModel
    onSubmit?: (d: IAddAssetRequest) => Promise<string | null>
    dropdownRef: React.RefObject<DropdownAlert>
}

const ASSET_SELECT_WIDTH = 320
const ARG_WIDTH = 50

export default (props: IProps) => {
    const { set } = props

    const [assetValue, setAssetValue] = useState(null as string | null) //list asset type
    const [dependencyValues, setDependencyValues] = useState([] as string[]) //list addresses 
    const [argumentsValues, setArgumentsValues] = useState([] as string[]) //list string arguments
    const [loadingState, setLoadingState] = useState(false)
    const [waitMessage, setWaitMessage] = useState('' as string | null)
    const [waitMessage2, setWaitMessage2] = useState('' as string | null)

    const onRequestAssetMinDate = async () => {
        const asset = ressources.get().availableAssets().findByAssetType(assetValue || '')
        if (!asset){
            return  new Error('Could not find the asset')
        }
        const deps = asset.get().dependencies()
        if (deps && deps.length > 0){
            const minDate = set.get().assets().filterByAddresses(dependencyValues).findMinHistoricalDate()
            if (minDate == null){
                return new Error('Could not find the minimum historical date for the dependencies')
            }
            return minDate
        }

        const t = setTimeout(() => {
            setWaitMessage('This can take from 15 to 90 seconds...')
        }, 7_000)

        // Looking for the asset minimum historical time for data...
        setWaitMessage('Looking for the asset minimum historical time for data...')
        const dataOrErr = await asset.fetchMinDataDate(set)
        clearTimeout(t)
        return dataOrErr
    }

    const onSubmit = async () => {
        const data = formatData()
        if (!data || !props.onSubmit)
            return
        setLoadingState(true)
        try {
            const d = await onRequestAssetMinDate()
            if (typeof d === 'string'){
                setWaitMessage(`Mininum date found : ` + d)
                if (data.asset.address.dependencies.length === 0){
                    data.asset.min_data_date = d
                }
            } else {
                showAlertMessage(props.dropdownRef).error((d as any).message)
            }
        } catch (e: any) {
            showAlertMessage(props.dropdownRef).error(e.toString())
        }

        if (!data.asset.min_data_date && data.asset.address.dependencies.length === 0){
            setLoadingState(false)
            return
        }
        setWaitMessage2('Sending the request...')
        await props.onSubmit(data)
        setLoadingState(false)
        setWaitMessage2('')
    }

    const formatData = (): (IAddAssetRequest | null) => {
        if (!assetValue){
            return null
        }

        const asset = ressources.get().availableAssets().findByAssetType(assetValue)
        if (!asset){
            return null
        }

        //to fill before sending the request
        const min_data_date = ''

        const countDependencies = !asset.get().dependencies() ? 0 : asset.get().dependencies().length
        const countArguments = !asset.get().argumentTypes() ? 0 : asset.get().argumentTypes().length

        const d: IAddAssetRequest = {
            set_id: set.get().settings().get().idString(),
            asset: {
                min_data_date,
                address: {
                    asset_type: asset.get().assetType(),
                    dependencies: dependencyValues.filter((arg) => arg.trim() !== ''),
                    arguments: argumentsValues.filter((arg) => arg.trim() !== '')
                }
            }
        }
        
        if (d.asset.address.dependencies.length !== countDependencies || d.asset.address.arguments.length !== countArguments){
            return null
        }
        return d
    }

    const renderArgument = (asset: AvailableAssetModel, index: number) => {
        const argType = asset.get().argumentTypes()[index]
        
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontSize: 11.5, marginBottom: 3}}>ARGUMENT VALUE #{index+1}</span>
                <input 
                    value={argumentsValues[index] || ''}
                    onChange={({ target: { value } }) => {
                        if (argumentsValues.length <= index){
                            setArgumentsValues(argumentsValues.concat([value]))
                        } else {
                            const newCpy = argumentsValues.slice()
                            newCpy[index] = value
                            setArgumentsValues(newCpy)
                        }
                    }}
                    style={{border: 'none', width: ARG_WIDTH, height: 21, outline: 'none', fontSize: 12}} 
                />
                {argType && <span style={{color: 'white', fontSize: 10.5, marginTop: 5}}>Type: <span style={{fontSize: 12.5, fontWeight: 800}}>{argType}</span></span>}
            </div>
        )
    }

    const renderNewAssetSelect = (list: AvailableAssetCollection) => {
        const options = list.map((asset: AvailableAssetModel) => {
            return {
                value: asset.get().assetType(),
                label: asset.get().label()
            }
        })

        const asset = assetValue ?  list.findByAssetType(assetValue): null

        return (
        <div style={{display: 'flex', flexDirection: 'column', width: ASSET_SELECT_WIDTH}}>
                <span style={{fontSize: 11.5, marginBottom: 3}}>NEW ASSET</span>
                <Select
                    defaultValue={undefined}
                    isSearchable={true}
                    options={options}
                    onChange={(e: any) => {
                        setAssetValue(e.value)
                        setDependencyValues([])
                        setArgumentsValues([])
                    }}
                    styles={selectStyle}
                />
                {asset && <span style={{color: 'white', fontSize: 10.5, marginTop: 7, fontStyle: 'italic'}}>{asset.get().description()}</span>}
            </div>
        )
    }

    const renderDependencySelect = (list: AssetCollection, index: number) => {
        const address = dependencyValues[index]
        let asset: AssetModel | null = null
        if (address){
            asset = list.findByAddress(address)
        }

        const options = list.map((asset: AssetModel) => {
            return {
                value: asset.get().addressString(),
                label: asset.get().ressource().get().label()
            }
        })

        const ressource = asset ? asset.get().ressource() : null

        return (
            <div style={{display: 'flex', flexDirection: 'column', width: ASSET_SELECT_WIDTH}}>
                    <span style={{fontSize: 11.5, marginBottom: 3}}>ARGUMENT ASSET #{index +1}</span>
                    <Select
                        defaultValue={undefined}
                        isSearchable={true}
                        options={options}
                        onChange={(e: any) => {
                            const value = e.value

                            if (dependencyValues.length <= index){
                                setDependencyValues(dependencyValues.concat([value]))
                            } else {
                                const newCpy = dependencyValues.slice()
                                newCpy[index] = value
                                setDependencyValues(newCpy)
                            }
                        }}
                        styles={selectStyle}
                    />
                {ressource && <span style={{color: 'white', fontSize: 10.5, marginTop: 7, fontStyle: 'italic'}}>{ressource.get().description()}</span>}
                </div>
            )
    }
    
    const renderIndicatorsExtra = () => {
        if (!assetValue){
            return null
        }
        const asset = ressources.get().availableAssets().findByAssetType(assetValue)
        if (!asset.isIndicator()){
            return null
        }
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                {asset.get().dependencies().map((dep, index) => {
                    return (
                        <div style={{marginTop: 20}} key={'bereefe' + index}>
                            {renderDependencySelect(set.get().assets().filterByDataType(dep), index)}
                        </div>
                    )
                })}
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                {asset.get().argumentTypes().map((argType, index) => {
                    return <div key={'argr' + index} style={{marginLeft: index > 0 ? 20 : 0}}>{renderArgument(asset, index)}</div>
                })}
                </div>
            </div>
        )
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {renderNewAssetSelect(set.get().assetsToAdd())}
            {renderIndicatorsExtra()}
            {assetValue && <Button
                title='Add'
                color={'green'}
                disabled={formatData() === null}
                onClick={onSubmit}
                style={{height: 25, marginTop: 30}}
                textStyle={{fontSize: 13}}
                loading={loadingState}
            />}
            <span style={{fontSize: 10.5, fontStyle: 'italic', width: ASSET_SELECT_WIDTH, marginTop: 5, opacity: waitMessage ? 1 : 0}}>{waitMessage || ' p '}</span>
            <span style={{fontSize: 10.5, fontStyle: 'italic', width: ASSET_SELECT_WIDTH, marginTop: 5, opacity: waitMessage2 ? 1 : 0}}>{waitMessage2 || ' p '}</span>
            </div>
    )
};