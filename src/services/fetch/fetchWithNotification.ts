import { showNotification } from '@mantine/notifications';

interface FetchWithNotificationOptions {
  showSuccessNotification?: boolean;
}

export async function fetchWithNotification<T>(
  input: RequestInfo,
  init?: RequestInit,
  options: FetchWithNotificationOptions = {}
): Promise<T | undefined> {
  try {
    const { showSuccessNotification = true } = options;
    const response = await fetch(input, init);

    switch (response.status) {
      case 200: {
        if (showSuccessNotification) {
          showNotification({
            title: 'Success',
            message: 'Operation completed successfully.',
            color: 'green',
          });
        }
        return await response.json();
      }
      case 404: {
        showNotification({
          title: 'Database Error',
          message: 'Failed to update the MongoDB database (404).',
          color: 'orange',
        });
        return undefined;
      }
      case 500: {
        showNotification({
          title: 'Server Error',
          message: 'A program error occurred on the server (500).',
          color: 'red',
        });
        return undefined;
      }
      case 501: {
        showNotification({
          title: 'Unrecognized Command',
          message: 'Client sent an unrecognized command (501).',
          color: 'yellow',
        });
        return undefined;
      }
      default: {
        const msg = `Unexpected response: ${response.status}`;
        showNotification({
          title: 'Unknown error',
          message: msg,
          color: 'gray',
        });
        return undefined;
      }
    }
  } catch (error: any) {
    showNotification({
      title: 'Network Error',
      message: error.message ?? 'An unexpected error has occurred.',
      color: 'red',
    });
    return undefined;
  }
}