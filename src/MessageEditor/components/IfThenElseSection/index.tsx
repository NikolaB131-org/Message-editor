import { SectionNode, BlockType } from '../../../hooks/useSectionsTree';
import { createContext, useContext } from 'react';
import { SectionsTreeContext } from '../..';
import { Button } from '../../../components/Button';
import { Block } from './components/Block';
import styles from './IfThenElseSection.module.css';

const crossSvg = (
  <svg className={styles.close_button_svg} width="800" height="800" viewBox="0 0 800 800" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M53.7531 679.843C35.4156 698.182 35.4156 727.908 53.7531 746.246C72.0906 764.585 101.822 764.585 120.16 746.246L53.7531 679.843ZM433.202 433.202C451.54 414.864 451.54 385.137 433.202 366.799C414.864 348.461 385.137 348.461 366.799 366.799L433.202 433.202ZM366.799 366.799C348.461 385.137 348.461 414.864 366.799 433.202C385.137 451.54 414.864 451.54 433.202 433.202L366.799 366.799ZM746.246 120.16C764.585 101.822 764.585 72.0906 746.246 53.7531C727.908 35.4156 698.182 35.4156 679.843 53.7531L746.246 120.16ZM433.202 366.799C414.864 348.461 385.137 348.461 366.799 366.799C348.461 385.137 348.461 414.864 366.799 433.202L433.202 366.799ZM679.843 746.246C698.182 764.585 727.908 764.585 746.246 746.246C764.585 727.908 764.585 698.182 746.246 679.843L679.843 746.246ZM366.799 433.202C385.137 451.54 414.864 451.54 433.202 433.202C451.54 414.864 451.54 385.137 433.202 366.799L366.799 433.202ZM120.16 53.7531C101.822 35.4156 72.0906 35.4156 53.7531 53.7531C35.4156 72.0906 35.4156 101.822 53.7531 120.16L120.16 53.7531ZM120.16 746.246L433.202 433.202L366.799 366.799L53.7531 679.843L120.16 746.246ZM433.202 433.202L746.246 120.16L679.843 53.7531L366.799 366.799L433.202 433.202ZM366.799 433.202L679.843 746.246L746.246 679.843L433.202 366.799L366.799 433.202ZM433.202 366.799L120.16 53.7531L53.7531 120.16L366.799 433.202L433.202 366.799Z" />
  </svg>
);

type SectionIdContextType = { getCurrentSectionId: () => number | undefined };
const defaultState: SectionIdContextType = { getCurrentSectionId: () => undefined };
export const SectionIdContext = createContext<SectionIdContextType>(defaultState); // used in Textarea element

type Props = {
  node: SectionNode;
};

export function IfThenElseSection({ node }: Props) {
  const { deleteSection } = useContext(SectionsTreeContext);

  const getCurrentSectionId = () => node.id;

  return (
    <div className={styles.container} id={node.id.toString()}>
      <div className={styles.close_button_and_stroke}>
        <Button className={styles.close_button} onClick={() => deleteSection(node.id)}>
          {crossSvg}
        </Button>
        <div className={styles.stroke}></div>
      </div>
      <div className={styles.if_then_else}>
        <SectionIdContext.Provider value={{ getCurrentSectionId }}>
          <Block type={BlockType.If} data={node[BlockType.If]} />
          <Block type={BlockType.Then} data={node.thenBlock} />
          <Block type={BlockType.Else} data={node.elseBlock} />
        </SectionIdContext.Provider>
      </div>
    </div>
  );
}
