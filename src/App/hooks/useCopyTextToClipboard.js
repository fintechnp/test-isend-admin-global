import Notify from 'utils/Notify';

const useCopyTextToClipboard = () => {
  const copyTextToClipboard = async (text) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  };

  const copyText = (text) => {
    copyTextToClipboard(text)
      .then(() => {
        Notify.success('Copied to clipboard');
      })
      .catch((err) => {
        console.error(err);
        Notify.error(err);
      });
  };

  return copyText;
};

export default useCopyTextToClipboard;
