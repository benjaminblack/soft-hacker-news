import allSettled from 'promise.allsettled';

allSettled.shim();

const BATCH_SIZE = 10;

export async function* itemsIterator(itemIds, batchSize = BATCH_SIZE) {
  let position = 0;

  while (position < itemIds.length - batchSize) {
    const batchIds = itemIds.slice(position, position + batchSize);
    yield getItems(batchIds);
    position += batchSize;
  }

  const batchIds = itemIds.slice(position, position + batchSize);
  return getItems(batchIds);
}

export async function getItems(ids) {
  const requests = ids.map((id) => getItem(id));
  const outcomes = await Promise.allSettled(requests);
  const items = outcomes.filter(({ status }) => status === 'fulfilled').map(({ value }) => value);
  return items;
}

export async function getItem(id) {
  return (await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)).json();
}

export async function getAllStoryIds(type) {
  return (await fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json`)).json();
}
