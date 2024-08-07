import axios from 'axios';

export async function downloadFile(props: {
  url: string;
  name?: string;
  classBack?: (progress: number) => void;
}): Promise<void> {
  try {
    const { data } = await axios.get(props.url, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total ?? 0)
        );
        props.classBack?.(percentCompleted);
      },
    });
    console.log('📝 TEMPLATE BLOB ', data);

    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = props.name || 'download';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}
