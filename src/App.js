import {HomePage} from './component/homePage/homePage'
import styles from './app.module.scss'
import {Provider} from 'react-redux'
import {store} from './store/index'

function App() {
    return (
        <Provider store={store} >
          <div className={styles.app}>
            <HomePage/>
          </div>
        </Provider>
    );
  
}

export default App;
