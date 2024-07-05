import { Model, Collection } from 'acey'


export interface IArchiveType {
    archive_type: string
    asset_childs: string[]
}

export const DEFAULT_ARCHIVE_TYPE: IArchiveType = {
    archive_type: '',
    asset_childs: []
}

export class ArchiveTypeModel extends Model {
    constructor(state: IArchiveType = DEFAULT_ARCHIVE_TYPE, options: any){
        super(state, options)
    }

    get = () => {
        return {
            archiveType: (): string => this.state.archive_type,
            assetChilds: (): string[] => (this.state.asset_childs || []).slice()
        }
    }
}

export class ArchiveTypeCollection extends Collection {
    constructor(state: (IArchiveType | ArchiveTypeModel)[] = [], options: any){
        super(state, [ArchiveTypeModel, ArchiveTypeCollection], options)
    }

    allAssetTypes = (): string[] => {
        return this.reduce((acc: string[], archiveType: ArchiveTypeModel) => {
            return acc.concat(archiveType.get().assetChilds())
        }, [])
    }

    findByArchiveType = (archiveType: string): ArchiveTypeModel | undefined => {
        return this.find((archiveTypeModel: ArchiveTypeModel) => {
            return archiveTypeModel.get().archiveType() === archiveType
        }) as ArchiveTypeModel 
    }
}


