import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider, Container } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{
        components: {
          Container: {
            defaultProps: {
              sizes: {
                xs: 540,
                sm: 720,
                md: 960,
                lg: 1140,
                xl: 1320,
              },
            },
          },
        },
      }}>
      <Container size="sm">
        <App />
      </Container>
    </MantineProvider>
  </React.StrictMode>,
)
