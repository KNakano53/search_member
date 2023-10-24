import React, {useState} from 'react';
import SearchResult from './searchResult';
import Button from 'react-bootstrap/Button';

function SearchBox() {
  const [searchFlag, setSeatchFlag] = useState(false);

  return ( 
    <div className="App">
      <div>
        <h1>testPage</h1>
        <input type='text' />
        <Button variant="primary" onClick={()=> setSeatchFlag(true) }>検索</Button>
      </div>
      <SearchResult searchFlag = {searchFlag} />
    </div>
  );
}

export default SearchBox;
