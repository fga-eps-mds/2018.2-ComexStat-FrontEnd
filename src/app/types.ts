export type tradeBloc = {
    blocNamePt: String;
}
export type originCountry = {
    tradeBloc: tradeBloc;
}
export type ncm = {
    ncmNamePt: string;
};
export type node = {
    date: string;
    fobValue: string;
    ncm: ncm;
    originCountry: originCountry;
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
