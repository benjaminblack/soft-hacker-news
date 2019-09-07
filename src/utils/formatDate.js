const formatDate = (date) =>
  new Date(date * 1000).toLocaleDateString({
    dateStyle: 'short',
    timeStyle: 'short',
  });

export default formatDate;
