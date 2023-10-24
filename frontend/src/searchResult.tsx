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
            result
        </div>
    );

}

export default SearchResult;