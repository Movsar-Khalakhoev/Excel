import {Excel} from '@/components/excel/excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import './sass/index.sass'
import {createStore} from './core/createStore'
import {rootReducer} from './redux/rootReducer'
import {debounce, storage} from './core/utils'
import {initialState} from '@/redux/initialState'

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
	storage('excelState', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table],
	store
})

excel.render()
