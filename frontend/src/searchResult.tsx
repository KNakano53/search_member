import React from "react";

type Props={
    searchFlag :boolean;
}

function SearchResult(props :Props){
    if(!props.searchFlag){
        return null;
    }
    return(
        <div>
            <h2>result</h2>
        </div>
    );

}

export default SearchResult;