import { useState } from 'react';
import PageNav from "../../components/common/PageNav";
import ItemList from "../../components/network/ItemList";

const MyNetworkContainer = () => {
  const [lists, setLists] = useState(['groups', 'users'])

  return (
    <main>
      <PageNav lists={lists} setLists={setLists} />
      <ItemList/>
    </main>
  );
};

export default MyNetworkContainer;
