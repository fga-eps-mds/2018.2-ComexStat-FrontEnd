export type ncm = {
    ncmNamePt: string;
};
export type node = {
    date: string;
    fobValue: string;
    ncm: ncm;
};
export type edges = {
    node: node;
};
export type AssetImportFacts = {
    edges: edges[];
};

export type Query = {
    allImport: AssetImportFacts;
};
