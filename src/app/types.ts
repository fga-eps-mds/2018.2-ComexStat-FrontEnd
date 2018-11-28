export type transportation = {
  transportationName: String;
}

export type urf = {
    urfName: String;
}

export type tradeBloc = {
    blocNamePt: String;
}
export type originCountry = {
    tradeBloc: tradeBloc;
    countryNamePt: String;
}
export type ncm = {
    ncmNamePt: string;
};
export type node = {
    date: string;
    fobValue: string;
    ncm: ncm;
    originCountry: originCountry;
    urf: urf;
    transportation: transportation;
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
