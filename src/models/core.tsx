

interface GridElement {
    styles?: GridElementStyles;
    id: string ,
    [key: string]: any;  // Allow any other properties
}


interface GridElementStyles {
    minHeight: string;
    height: string;
    minWidth: string;
    maxWidth: string;
    maxHeight: string;
    gridArea: string;
    display: string;
    boxSizing: string;
    rowGap: string;
    columnGap: string;
    gridTemplateRows: string;
    gridTemplateColumns: string;
}