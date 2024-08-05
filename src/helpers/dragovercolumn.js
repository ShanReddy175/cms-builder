

    /**
     * 
     * @param {Number} pageX - Dragger X Coordination Value
     * @param {Number} pageY - Dragger Y Coordination Value
     */
    export async function dragOverColumn(pageX, pageY, parentEle, isDrop= false) {
        const dragElements = parentEle.querySelectorAll('div');
        // console.log(pageX, pageY, parentEle)
        const scgrids = [...dragElements].filter(ele => ele.getAttribute('data-type') === 'grid');
        let targetEle = null;
        let closestDistance = Infinity;
    
        scgrids.forEach((grd) => {
            let values = grd.getBoundingClientRect();
            if(isDrop){
                console.log(values, pageX, pageY)
            }
            const condition = (pageX >= values.left && pageX <= values.right)
             && (pageY >= values.top && pageY <= values.bottom);
             
            if (condition) {
                if(grd.getAttribute('data-state') !== 'active'){
                    targetEle = grd;
                }
            }
        });

    
        return targetEle;
    }
    