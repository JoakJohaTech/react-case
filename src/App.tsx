import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { IncrementIcon, DecrementIcon } from './assets/index';
import { GITHUB_REPOS } from './constans';
import { fetchWrapper } from './util/fetcher';
import Button from './components/Button/Button';
import Card from './components/Card/Card';

export interface GHObject {
  full_name: string;
  description: string;
  stargazers_count: number;
}

const useStyles = createUseStyles({
  '@global': {
    body: {
      display: 'flex',
      fontFamily: ['Open Sans', 'Arial', 'Serif'],
      justifyContent: 'center',
      margin: '0',
      placeItems: 'center',
    },
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    paddingTop: '100px',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
  },
  span: {
    fontWeight: '700',
    paddingRight: '10px',
    paddingLeft: '10px', 
  }
});

function App() {
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState<GHObject | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const classes = useStyles();

  function handleIncrementClick() {
    setCount(prevCount => prevCount + 1);
  }

  function handleDecrementClick() {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  }

  useEffect(() => {
    fetchWrapper<GHObject>(`https://api.github.com/repos/${GITHUB_REPOS[count]}`)
    .then((ghResponse) => {
      setResponse(ghResponse);
      setLoaded(true);
    })
    .catch(() => setError(true));
  }, [count]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Button name='Decrement' onClick={handleDecrementClick} btnType='normal'>
          <DecrementIcon />
        </Button>
        <span className={classes.span}>Counter: {count}</span>
        <Button name='Increment' onClick={handleIncrementClick} btnType='primary'>
          <IncrementIcon />
        </Button>
      </div>
      {loaded && !error &&
        <Card data={response} />
      }
    </div>
  );
}

export default App;
