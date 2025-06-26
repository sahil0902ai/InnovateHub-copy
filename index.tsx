import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { IdeaProvider } from './contexts/IdeaContext';
import { GroupProvider } from './contexts/GroupContext';

console.log('index.tsx: Script execution started.'); // Diagnostic log

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <IdeaProvider>
              <GroupProvider>
                <App />
              </GroupProvider>
            </IdeaProvider>
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

console.log('index.tsx: Script execution finished, root.render completed.'); // Diagnostic log