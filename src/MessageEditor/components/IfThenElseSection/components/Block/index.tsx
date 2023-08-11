import { BlockType, BlockNode, BlockPart } from '../../../../../hooks/useSectionsTree';
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
      case BlockType.If: {
        className = styles.if_span;
        text = 'IF';
        break;
      }
      case BlockType.Then: {
        className = styles.then_span;
        text = 'THEN';
        break;
      }
      case BlockType.Else: {
        className = styles.else_span;
        text = 'ELSE';
        break;
      }
    }

    return <span className={className}>{text}</span>;
  };

  return (
    <div className={styles.container}>
      <div>
        {getSpan()}
        <Textarea
          parentBlockPart={BlockPart.First}
          parentBlockType={type}
          placeholder={type === BlockType.If ? 'Variable' : undefined}
          value={data[BlockPart.First]}
        />
      </div>
      {data[BlockPart.Middle] && ( // if another section inside this block
        <>
          <div className={styles.middle_part}>
            <span></span>
            <IfThenElseSection node={data[BlockPart.Middle]} />
          </div>
          <div>
            <span></span>
            <Textarea parentBlockPart={BlockPart.Last} parentBlockType={type} value={data[BlockPart.Last]} />
          </div>
        </>
      )}
    </div>
  );
}
