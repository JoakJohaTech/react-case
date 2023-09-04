import { GHObject } from "../../App";
import { createUseStyles } from 'react-jss';
import { Loader } from '../../assets/index';

interface Props {
  data: GHObject | null
}


const useStyles = createUseStyles({
  card: {
    background: 'aliceblue',
    border: 'solid aliceblue',
    borderRadius: '50px',
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    justifyContent: 'center',
    marginTop: '20px',
    width: '500px',
  },
  text: {
    height: '100%',
    marginLeft: '20px',
    marginRight: '20px',
    textOverflow: 'ellipsis',
  }
});

export default function Card(props: Props) {

  const classes = useStyles();

  const { data } = props; 

  if (!data ) {
    return(
      <>
        <Loader />
      </>
    );
  }

  return(
    <>
      <div className={classes.card}>
        <div className={classes.text}>
          <h3>Repo</h3>
          <p>{data.full_name}</p>
          <h3>What is it about</h3>
          <p>{data.description}</p>
          <p><b>Stars: </b>{data.stargazers_count}</p>
        </div>
      </div>
    </>
  );
}
