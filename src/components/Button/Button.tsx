import { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

type RuleNames = 'normalButton' | 'primaryButton' | 'sharedStyle';

interface ButtonProps {
  name?: string;
  btnType: 'normal' | 'primary';
  onClick: () => void;
  children: ReactNode;
}

const useStyles = createUseStyles<RuleNames, ButtonProps>({
  sharedStyle: {
    alignItems: 'center',
    border: 'solid 2px',
    borderRadius: '50px',
    display: 'flex',
    fontSize: 'larger',
    fontWeight: '500',
    height: '50px',
    justifyContent: 'center',
    width: '200px',
  },
  normalButton: {
    extend: 'sharedStyle',
    color: 'black',
    background: 'white',
    '&:hover': {
      background: 'black',
      color: 'white',
      '& svg': {
        fill: 'white',
      }
    },
    '& svg': {
      fill: 'black',
    }
  },
  primaryButton: {
    extend: 'sharedStyle',
    color: 'white',
    background: 'hotpink',
    '&:hover': {
      background:  'rebeccapurple',
    },
    '& svg': {
      fill: 'white',
    },
  }
});

export default function Button({...props}: ButtonProps): React.ReactElement {

  const { name, onClick, children, btnType } = props;

  const classes = useStyles({...props});

  return(
    <>
      <button 
        className={`${btnType === 'normal' ? classes.normalButton : classes.primaryButton}`} 
        onClick={onClick}
      >
        {children}
        <span>{name}</span>
      </button>
    </>
  );
}
