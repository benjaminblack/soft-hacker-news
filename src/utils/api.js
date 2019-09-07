import allSettled from 'promise.allsettled';

allSettled.shim();

const BATCH_SIZE = 10;

export async function* itemsIterator(itemIds, batchSize = BATCH_SIZE) {
  let position = 0;

  for (;;) {
    const batchIds = itemIds.slice(position, position + batchSize);
    position += batchSize;

    if (position < itemIds.length - 1) {
      yield getItems(batchIds);
    } else {
      return getItems(batchIds);
    }
  }
}

export async function getItems(ids) {
  const requests = ids.map((id) => getItem(id));
  const outcomes = await Promise.allSettled(requests);
  const items = outcomes.filter(({ status }) => status === 'fulfilled').map(({ value }) => value);
  return items;
}

export async function getItem(id, endpoint = 'item') {
  return (await fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}/${id}.json`)).json();
}

export async function getStories(type) {
  return (await fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json`)).json();
}
