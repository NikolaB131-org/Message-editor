import { Template } from '../hooks/useSectionsTree';
import { useState, useEffect } from 'react';
import { generateMessage } from '../utils/generateMessage';
import { Button } from '../components/Button';
import { Textarea } from './components/Textarea';
import { Variable } from './components/Variable';
import copySvg from '../assets/copy.svg';
import crossSvg1 from '../assets/cross.svg';
import styles from './MessagePreview.module.css';

const crossSvg2 = ( // for right top close button
  <svg width="800" height="800" viewBox="0 0 800 800" fill="grey" xmlns="http://www.w3.org/2000/svg">
    <path d="M53.7531 679.843C35.4156 698.182 35.4156 727.908 53.7531 746.246C72.0906 764.585 101.822 764.585 120.16 746.246L53.7531 679.843ZM433.202 433.202C451.54 414.864 451.54 385.137 433.202 366.799C414.864 348.461 385.137 348.461 366.799 366.799L433.202 433.202ZM366.799 366.799C348.461 385.137 348.461 414.864 366.799 433.202C385.137 451.54 414.864 451.54 433.202 433.202L366.799 366.799ZM746.246 120.16C764.585 101.822 764.585 72.0906 746.246 53.7531C727.908 35.4156 698.182 35.4156 679.843 53.7531L746.246 120.16ZM433.202 366.799C414.864 348.461 385.137 348.461 366.799 366.799C348.461 385.137 348.461 414.864 366.799 433.202L433.202 366.799ZM679.843 746.246C698.182 764.585 727.908 764.585 746.246 746.246C764.585 727.908 764.585 698.182 746.246 679.843L679.843 746.246ZM366.799 433.202C385.137 451.54 414.864 451.54 433.202 433.202C451.54 414.864 451.54 385.137 433.202 366.799L366.799 433.202ZM120.16 53.7531C101.822 35.4156 72.0906 35.4156 53.7531 53.7531C35.4156 72.0906 35.4156 101.822 53.7531 120.16L120.16 53.7531ZM120.16 746.246L433.202 433.202L366.799 366.799L53.7531 679.843L120.16 746.246ZM433.202 433.202L746.246 120.16L679.843 53.7531L366.799 366.799L433.202 433.202ZM366.799 433.202L679.843 746.246L746.246 679.843L433.202 366.799L366.799 433.202ZM433.202 366.799L120.16 53.7531L53.7531 120.16L366.799 433.202L433.202 366.799Z" />
  </svg>
);

type Props = {
  arrVarNames: string[];
  template: Template;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export type VariablesObject = { [key: string]: string };

const getinitialState = (variablesNames: string[]): VariablesObject => {
  const initialState: VariablesObject = {};
  variablesNames.forEach(name => initialState[name] = '');
  return initialState;
};

export function MessagePreview({ arrVarNames, template, setIsVisible }: Props) {
  const [message, setMessage] = useState('');
  const [variables, setVariables] = useState<VariablesObject>(() => getinitialState(arrVarNames));

  const setVariable = (name: string, value: string) => { // callback that called when variable changes
    const newVariables = { ...variables };
    newVariables[name] = value;
    setVariables(newVariables);
  };

  useEffect(() => { // regenerate message every time any variable changes
    setMessage(generateMessage(template, variables));
  }, [variables, template]);

  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header_invisible_div} /> {/* need for balance elements in header */}
        <h2 className={styles.header_title}>Message Preview</h2>
        <Button className={styles.header_close_button} onClick={() => setIsVisible(false)}>
          {crossSvg2}
        </Button>
      </header>

      <div className={styles.content}>
        <Textarea className={styles.message_textarea} value={message} readOnly />
        <h3 className={styles.variables_title}>Variables</h3>
        <div className={styles.variables}>
          {Object.keys(variables).map((name, i) => (
            name && <Variable key={i} name={name} setVariable={setVariable} value={variables[name]} />
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <Button text='Copy to buffer' imgSrc={copySvg} onClick={() => navigator.clipboard.writeText(message)} />
        <Button text='Close' imgSrc={crossSvg1} onClick={() => setIsVisible(false)} />
      </footer>
    </div>
  );
}
