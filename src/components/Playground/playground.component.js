import { useDispatch, useSelector } from 'react-redux';
import styles from './playground.module.scss';
import EmptyPage from '../EmptyPage/index.component';
import { Fragment, useCallback, useEffect, useState } from 'react';
import SectionComponent from '../Elements/Section/index.component';
import { GridControlV2, sectionLayersUpdateNClick } from '../../services/internal/grid/gridControl';
import IframeContainer from './IframeContainer';
import { useDebouncedResizeEffect } from '../../customHooks/useDebounce';
import useAddSection from '../../customHooks/useAddSection';
import LayersReactComponent from './Tools/layers';
import { showEmptySectionScreen } from '../../redux/slices/emptySection';
import { useOutsideClick } from '../../customHooks/useOutsideClick';

export default function Playground(){
    const pageJson = useSelector(state => state.pageJson);
    const emptySection = useSelector(state => state.emptySection);
    const pageBody = pageJson.page.body;
    const [sections, setSections] = useState({...pageBody});
    const [windowWidth, setWindowWidth] = useState(1280);
    const addSection = useAddSection();

    const dispatch = useDispatch();

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function pageWrapperClick(){
        
    }

    // useDebouncedResizeEffect(() => {
    //     // setSections(pageBody);
    //     setTimeout(() => {
    //         GridControlV2();
    //     }, 10);
    // }, 10); // Adjust the debounce delay as needed

    // useEffect(()=>{
    //     window.addEventListener('resize',(e)=>{
    //         // console.log(window.innerWidth);
    //         // setWindowWidth(window.innerWidth)
    //         addSection(sections);
    //     })

    //     return () => {
    //         window.removeEventListener('resize', ()=>{});
    //     };
    // }, [])
    useEffect(()=>{
        setSections(pageBody);
        // setTimeout(()=>{
        //     GridControlV2();
        // }, 10)
        // const handleResize = debounce(() => {
        //     GridControlV2();
        // }, 200); // Adjust the debounce delay as needed

        // window.addEventListener('resize', handleResize);

        // Initial call to GridControlV2 after setting sections
        setTimeout(() => {
            GridControlV2();
        }, 10);



        // return () => {
        //     window.removeEventListener('resize', handleResize);
        // };
    }, [pageBody, pageJson]);

    useEffect(()=>{
        // dispatch(showEmptySectionScreen({
        //     show: Object.keys(sections).length === 0,
        //     currentSection: null,
        //     position: 'bottom',
        //     obj: {}
        // }))

        
    }, []);

    const pageWrapperRef = useOutsideClick(()=>{
        sectionLayersUpdateNClick('', 'remove');
    })

    // useCallback(()=>{
    //     if(sections && Object.keys(sections).length > 0){
    //         // GridControlV2();
    //     }
    // },[sections]);

    return <div id={styles.playground} data-id="cms__template__editor">
            <div 
                data-id="page-wrapper"
                ref={pageWrapperRef}
            >
                <header>Page Header</header>
                {
                    sections && Object.keys(sections).length > 0 ? <>
                    {
                        [...Object.keys(sections)].map((sectionKey, index)=>{
                            const section = sections[sectionKey];
                            return <SectionComponent key={index} section={section}/>
                        })
                    }
                    </>
                     : <>
                        <EmptyPage />
                    </>
                }

                <footer>Page Footer</footer>

                {/* Empty Page */}

                {/* {
                    emptySection.show && <>
                        <EmptyPage />
                    </>
                } */}
                
                <LayersReactComponent 
                    sections={sections}
                />                
            </div>
        {/* <IframeContainer>

        </IframeContainer> */}
        {/* <LayersReactComponent 
            sections={sections}
        /> */}
    </div>
}