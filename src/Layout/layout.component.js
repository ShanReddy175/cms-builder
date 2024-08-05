import Playground from '../components/Playground/playground.component';
import styles from './layout.module.scss';

export default function MainLayout(){
    return <>
        <main id={styles.main__layout}>
            <header id={styles.main__header}>
                <h1>SellersCommerce - Mini Builder</h1>
                <button>
                    Update
                </button>
            </header>

            <div className={styles.main__div}>
                {/* Sidebar For Add Elements */}
                <div className={styles.add__sidebar}>
                    <div className={styles.wrapper}>
                        <div className={styles.btn__list}>
                            <button type='button' datatype='add-element' aria-label='Add Elements'>
                                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 11h-7V4h-1v7H4v1h7v7h1v-7h7v-1Z"></path></svg>
                            </button>
                        </div>
                    </div>                  
                </div>

                {/* Playground */}
                <div className={styles.playground__parent}>
                    <div className={styles.wrapper} data-cms-tool-id="playground_wrapper">
                        <Playground />
                    </div>
                </div>
            </div>
        </main>
    </>
}