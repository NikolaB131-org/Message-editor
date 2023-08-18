import { BlockType, BlockNode } from '../../../../../hooks/useSectionsTree';
import { isSectionNode } from '../../../../../utils/isSectionNode';
import { Textarea } from '../../../Textarea';
import { IfThenElseSection } from '../..';
import styles from './Block.module.css';

type Props = {
  type: BlockType;
  data: BlockNode;
};

export function Block({ type, data }: Props) {
  const getSpan = () => {
    let className: string;
    let text: string;
    switch(type) {
      case BlockType.If:
        className = styles.if_span;
        text = 'IF';
        break;
      case BlockType.Then:
        className = styles.then_span;
        text = 'THEN';
        break;
      case BlockType.Else:
        className = styles.else_span;
        text = 'ELSE';
        break;
    }

    return <span className={className}>{text}</span>;
  };

  return (
    <div className={styles.container}>
      <div>
        {getSpan()}
        <Textarea
          parentPositionIndex={0}
          parentBlockType={type}
          value={data[0] as string}
          placeholder={type === BlockType.If ? 'Variable' : undefined}
        />
      </div>
      {data.slice(1).map((part, i) => { // skipping first element because its already used
        if (isSectionNode(part)) {
          return (
            <div key={i}>
              <span></span>
              <IfThenElseSection node={part} />
            </div>
          );
        } else {
          return (
            <div key={i}>
              <span></span>
              <Textarea
                parentPositionIndex={i + 1} // i + 1 because we skipped first element
                parentBlockType={type}
                value={part}
              />
            </div>
          );
        }
      })}
    </div>
  );
}
