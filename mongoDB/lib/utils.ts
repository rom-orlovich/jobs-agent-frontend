import { GenericRecord } from '@/lib/types/types';
import { Collection } from 'mongodb';
import clientPromise from 'mongoDB/mongoDB';
/**
 * @param {string} dbName The DB name.
 * @param {string} colName The Collection Name.
 * @returns {Promise<Collection>} The collection from the DB.
 */
export const getCollection = async (colName: string, dbName = 'jobs-agent-db'): Promise<Collection> => {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(colName);
  return collection;
};

/**
 * @param {string} name The beginning of documents's name to search for.
 * @param {string} colName The collection Name.
 * @param {string} fieldName The field name in the document to search.
 * @param {string} dbName The DB name. default 'jobs-agent-db'.
 * @returns {Promise<D[]>} The array of the documents that were found.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDocumentsByName = async <D extends GenericRecord<any>>(
  name: string,
  colName: string,
  fieldName: string,
  page = 1,
  limit = 30,
  dbName = 'jobs-agent-db'
): Promise<D[]> => {
  try {
    const collection = await getCollection(colName, dbName);
    const regex = new RegExp(`${name}`, 'i');
    const res = collection
      .find<D>({
        [fieldName]: regex
      })
      .limit(limit)
      .skip((page - 1) * limit);

    const data = await res.toArray();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
