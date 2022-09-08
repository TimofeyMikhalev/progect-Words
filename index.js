import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import express from 'express';
import serviceAccount from './utils/my-progrem-word-firebase-adminsdk-o2bdp-c51ea71e3f.json' assert {type: "json"};

const app = express(function(){});
app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const db = await initializeAppSA();

app.get('/api/get', async(request, response) => {
    const data = await getAll();
    response.json(data)
});
app.post('/api/set', async(request, response) => {
    const data = request.body;
    quickstartAddData(data)
});

async function initializeAppSA() {
    // [START initialize_app_service_account]

    initializeApp({
      credential: cert(serviceAccount)
    });
  
    const db = getFirestore();
  
    // [END initialize_app_service_account]
    return db;
}

async function quickstartAddData(objectForServer) {
  // [START firestore_setup_dataset_pt1]
  const docRef = db.collection('project');

  await docRef.add(objectForServer);
  // [END firestore_setup_dataset_pt1]
}

async function getAll() {
    // [START firestore_data_get_all_documents]
    const wordRef = db.collection('project');
    const snapshot = await wordRef.get();
    const words = []
    await snapshot.forEach(doc => {
        words.push(doc.data())
    })
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
    console.log(words)
    // [END firestore_data_get_all_documents]
    return words
  }