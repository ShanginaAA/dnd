import { Box } from '@mui/material';
import { FC } from 'react';
import Head from './Head';
import QuestionsList from '../questions/QuestionsList';
import { FormPages, PlaceholderProps } from '~/types/pages.type';
import { Draggable } from '@hello-pangea/dnd';

type PageProps = {
  item: FormPages;
  index: number;
  placeholderProps: PlaceholderProps | undefined;
};

const Page: FC<PageProps> = ({ item, index, placeholderProps }) => {
  return (
    <Draggable key={`page-${item.id}`} draggableId={`page-${item.id}`} index={index}>
      {(parentProvider, snapshot) => (
        <div
          id={`page-${item.id}`}
          ref={parentProvider.innerRef}
          {...parentProvider.draggableProps}
          style={{
            ...parentProvider.draggableProps.style,
            marginBottom: 32,
          }}>
          <Box
            key={item.id}
            sx={{
              border: '1px solid #D9D9D9',
              backgroundColor: '#fff',
              opacity: snapshot.isDragging ? '0.3' : '1',
            }}>
            <Head id={item.id} index={index + 1} parentProvider={parentProvider} />
            <QuestionsList item={item} placeholderProps={placeholderProps} />
          </Box>
        </div>
      )}
    </Draggable>
  );
};

export default Page;
