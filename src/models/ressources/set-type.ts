
import { Model, Collection } from 'acey'
import { ArchiveTypeCollection, IArchiveType } from './archive-type'

export interface ISetType {
    type: number
    archive_childs: IArchiveType[]
    type_name: string
}

export const DEFAULT_SET_TYPE: ISetType = {
    type: 0,
    archive_childs: [],
    type_name: ''
}

export class SetTypeModel extends Model {
    constructor(state: ISetType = DEFAULT_SET_TYPE, options: any){
        super({}, options)
        this.setState(Object.assign({}, state, {
            archive_childs: state.archive_childs && state.archive_childs.length > 0 ? new ArchiveTypeCollection(state.archive_childs, this.kids()) : null
        }))
    }

    get = () => {
        return {
            type: (): number => this.state.type,
            archiveChilds: (): ArchiveTypeCollection | null => this.state.archive_childs,
            typeName: (): string => this.state.type_name
        }
    }
}

export class SetTypeCollection extends Collection {
    constructor(state: (ISetType | SetTypeModel)[] = [], options: any){
        super(state, [SetTypeModel, SetTypeCollection], options)
    }

    findByType = (type: number) => {
        return this.find((setType: SetTypeModel) => setType.get().type() === type) as SetTypeModel | null
    }
}