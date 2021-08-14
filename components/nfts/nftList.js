// dummy nft's to be used in the feed

import nftItem from './nftItem';
import classes from './nftList.module.css';

function nftList(props) {
  return (
    <ul className={classes.list}>
      {props.nft.map((nft) => (
        <nftItem
          key={nft.id}
          price={nft.price}
          image={nft.image}
          title={nft.title}
          owner={nft.owner}
        />
      ))}
    </ul>
  );
}

export default nftList;