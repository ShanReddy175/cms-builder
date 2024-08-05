

export function removeElementEvent(element, callback, excludeElements = [], type = ''){
    const handler = (e) => {
        const clickTarget = e.target;
        if (element.contains(clickTarget)) return;

        for (let excludeElement of excludeElements) {
            if (
                (excludeElement && excludeElement?.contains(clickTarget))
                || (type === 'attr' && excludeElement?.getAttribute('data-type') === clickTarget?.getAttribute('data-typ'))
            ) return;
        }

        callback();
        document.removeEventListener('click', handler);
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
}