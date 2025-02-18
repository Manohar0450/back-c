const { google } = require('googleapis');
const KEYFILEPATH = "./pdf-downloader-446009-607ad392a169.json";
const SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.readonly'];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});


//predefinig the subjects of the individual semester based on Department and Regulation
const Subjects = {
   R20_AIML : {
    "2-1Semester" : ["R20_AIML.Mathematics-III", "R20_AIML.Mathemetical Foundations Of Computer Science", "R20_AIML.DataBase Management System", "R20_AIML.INTRODUCTION TO ARTIFICIAL INTELLIGENCE AND MACHINE LEARNINGE", "R20_AIML.OBJECT ORIENTED PROGRAMMING WITH JAVA"],
    "2-2Semester" : ["R20_AIML.Probability and Statistics", "R20_AIML.Formal Languages and Automata Theory", "R20_AIML.Managerial Economics and Financial Accountancy", "R20_AIML.COMPUTER ORGANIZATION", "R20_AIML.DATA WAREHOUSING AND MINING"],
    "3-1Semester" : ["R20_AIML.SOFTWARE ENGINEERING", "R20_AIML.MACHINE LEARNING", "R20_AIML.OPERATING SYSTEMS", "R20_AIML.COMPILER DESIGN", "R20_AIML.DEVOPS"],
    "3-2Semester" : ["R20_AIML.DESIGN AND ANALYSIS OF ALGORITHMS", "R20_AIML.SOFTWARE PROJECT MANAGEMENT", "R20_AIML.DEEP LEARNING", "R20_AIML.COMPUTER NETWORKS", "R20_AIML.MEAN Stack Development"],
    "4-1Semester" : ["R20_AIML.Crytography and Networks Security", "R20_AIML.Cloud Computing", "R20_AIML.Object Oriented Analysis And Design", "R20_AIML.APi and Micro Services", "R20_AIML.Secure Coding Techniques", "R20_AIML.Universal Human values"]
   },
   R23_AIML : {
    "2-1Semester" : ["R23_AIML.Advance Data Structures", "R23_AIML.ARTIFICIAL INTELLIGENCE", "R23_AIML.Discrete Mathematiics and Graph Theory", "R23_AIML.EnvironMental Science", "R23_AIML.Object Oriented Programming Through Java"],
    "2-2Semester" : ["R23_AIML.DataBase Management System", "R23_AIML.Design Thinking and Innovation", "R23_AIML.Full Stack Development", "R23_AIML.machine Learning", "R23_AIML.Optimization techniques", "R23_AIML.Probability and Statistics"],
    "3-1Semester" : [],
    "3-2Semester" : [],
    "4-1Semester" : []
   },
   R20_IOT : {
    "2-1Semester" : ["R20_IOT.Mathematics-III", "R20_IOT.Mathemetical Foundations Of Computer Science", "R20_IOT.Data Structures", "R20_IOT.OPERATING SYSTEMS", "R20_IOT.JAVA Programming"],
    "2-2Semester" : ["R20_IOT.COMPUTER ORGANIZATION AND ARCHITECTURE", "R20_IOT.Probability and Statistics", "R20_IOT.Formal Languages and Automata Theory", "R20_IOT.DataBase Management System", "R20_IOT.Managerial Economics and Financial Accountancy"],
    "3-1Semester" : ["R20_IOT.DESIGN AND ANALYSIS OF ALGORITHMS", "R20_IOT.IOt Architecture and Protocols", "R20_IOT.COMPUTER NETWORKS", "R20_IOT.Cloud Computing", "R20_IOT.Software Engineering" ],
    "3-2Semester" : ["R20_IOT.Embeded Systems Design", "R20_IOT.MACHINE LEARNING", "R20_IOT.Sensors and Actors Device For IOT"],
    "4-1Semester" : []
   },
   R23_IOT : {
    "2-1Semester" : ["R23_IOT.Advanced Data Structures & Algorithms Analysis", "R23_IOT.Digital Logic & Computer Organization", "R23_IOT.Discrete Mathematics & Graph Theory", "R23_IOT.Object Oriented Programming Through Java"],
    "2-2Semester" : ["R23_IOT.Computer Networks", "R23_IOT.Design Thinking & Innovation", "R23_IOT.Managerial Economic and Financial Analysis", "R23_IOT.Microprocessors & Microcontrollers ", "R23_IOT.Operating Systems ", "R23_IOT.Probability & Statistics", "R23_IOT.Full Stack Development-I"],
    "3-1Semester" : [],
    "3-2Semester" : [],
    "4-1Semester" : []
   }
}

const FolderIds = {
    "R20_AIML_M-III" : "1LA_ULRmnv8c04I17X2Z3R_xpYtQiwZ7D",
    "R20_AIML_MFCS" : "1-TRUEzRMgX7Af2ZEJUw4unF4sYsjVFFV",
    "R20_AIML_DBMS" : "12455g3oRT0MqfycTMWcyKxE1kl-BLOah",
    "R20_AIML_INTRO AIML" : "1jXRPzoZDVgVXInaORfWM9v2GzTjNHxzA",
    "R20_AIML_OOPS JAVA" : "1_-MnrVL0qRzm15O_uW8E5Zn5SuuDMgc1",
    "R20_AIML_P&S" : "1jB9-VlWfwO-zUAsQogurx5nFEnhhx1_3",
    "R20_AIML_DL" : "1VWhp4gwkmYq2uB8EwdemXTKrtrxIe0nx",
    "R20_AIML_FLAT" : "1n95UE7TanDprIC0_4UhLHWsHlwgbFez1",
    "R20_AIML_MEFA" : "1E3jZAZdQqeXau6Ilez14k0RzTd_-VpMy",
    "R20_AIML_CO" : "1x5MFg_AvVppsKVv5ns2_jMszA27MJtZT",
    "R20_AIML_DWDM" : "1ebr0NPStCU8WPhdfJfJ_mklN5UVXy67X",
    "R20_AIML_SE" : "1xrjEdKsqxYv3tvsA1AH7oIrmMH7QR6mW",
    "R20_AIML_ML" : "1EMpFzMNV83M9gPL7HVFdyL8070OfZKDV",
    "R20_AIML_OS" : "1RR_ebbXCwtDVSxHs54FtRkraGtZ_B5xe",
    "R20_AIML_CD" : "1PBPoQQN9COgmls2t2SfTPOP9VBqoYIPL",
    "R20_AIML_DEVOPS" : "1ZjAMj7oNlFyPaOPYtJFGWJBnqzC8VYEh",
    "R20_AIML_DAA" : "1QHMECts298OvJnoHr6tRqJ8kdnzNlWTd",
    "R20_AIML_SPM" : "1r-hUf5AxNs-Bl7VZHvOcsoOPmhT5xKZ8",
    "R20_AIML_DL" : "121RWlR4As5htQkaBnOZssgLd1ZQuQvCj",
    "R20_AIML_CN" : "18WvW54l21GC8ewbj-Pl4xRd6h575CCtC",
    "R20_AIML_MSD" : "1emD17Msy721FdvFRQWxcjErzGz8utQSy",
    "R20_AIML_CNS" : "1C45H2cl1_LUx-aGfap3BdblSHQUj2jSm",
    "R20_AIML_CC" : "1ojGJuUBReIf6gZnIsNIG88_wIIUWBR9u",
    "R20_AIML_OOAD" : "1OxbV2x53G42GdszApsMO0nWueLObTx5R",
    "R20_AIML_APiMS" : "1ajRKk_4M4nwICIWxDxxBYLij8z-UYO38",
    "R20_AIML_SCT" : "1zQ_loRMSWmgkjl-2r5thxMc2IWg7NuhV",
    "R20_AIML_UHV" : "P1Ietymo9vjaygTKeSSCVaVXuk94Jezc",
    "R23_AIML_ADS" : "1_ZI04tTFw5BrL-lILltYWUUppDZTARPe",
    "R23_AIML_AI" : "1xbAWCamEthX5qN2kLwIvsd6zz8YOOeKV",
    "R23_AIML_DMGT" : "1s4AZu9zqvMfALlaw1DTFTm5ZiNvAUW1e",
    "R23_AIML_ES" : "1iF_uect3KdvIEaDb955umUqsWh3w3QTw",
    "R23_AIML_OOPJ" : "1XX-MU-lqxQnZQiADT4xNwCgwmoeew0Ff",
    "R23_AIML_DBMS" : "1K9mJJ3eBc8I8buertRpq7uO1uprjKRDC",
    "R23_AIML_DTI" : '1rwba-mCFCnjci-fnXNhfpQU3k4-rwtTe',
    "R23_AIML_FSD" : "1gl71eNi9OtJEhpRGLRMxGSuQlRu1BTkC",
    "R23_AIML_ML" : "1Kxpui1Yj1UpaE94FjMrA6daSuraFA2pG",
    "R23_AIML_OT" : "1lVSzEyAKeAcU39XManMn8dKOuSn0W1zD",
    "R23_AIML_P&S" : "1v_fboD3FIaKbxEtulP9MjqIKPtlx0wA4",
    "R20_IOT_M-III" : "1ZEN0lIlFgX1UudHlrzpTK9kuw9EqRksW",
    "R20_IOT_MFCS" : "1MNONeOoNwhcTpkcKygGXGz7seUgfYT1Z",
    "R20_IOT_DS" : "1-p2nsIs2igkD5EstQEoPoBdIs9Oc8n-u",
    "R20_IOT_OS" : "1KrsTP5oEYOWljVHFWn4o2GInbB41Rpqa",
    "R20_IOT_JP" : "1KZEzXar5Z_Y163Nb8BODpguk5oevVqG4",
    "R20_IOT_COA" : "1vAWVL7UUM0zjt77hge72u1Cg8mUNRn1p",
    "R20_IOT_P&S" : "1w7lNn0DQQCLsy03wdXYcYBvtIRxbx53i",
    "R20_IOT_FLAT" : "1HSeomvofk8HfERo9bpR3MTiycuER_H2f",
    "R20_IOT_DBMS" : "1M-mETclpT20WYEvxGBUqDGj_s25FMfO1",
    "R20_IOT_MEFA" : "1Liu4qAYqqlOSfbI11XN0eLRoeUKDP0If",
    "R20_IOT_DAA" : "1Xk-ELnLuWXM5cNVUgFpo673NMttXIQZM",
    "R20_IOT_IAP" : "1WUPwhwHCmyd3ePE6_YVWdQCe_JZc--yo",
    "R20_IOT_CN" : "1R_loFLV4UZimLZAjqN6dMNcB2-AX6Fdx",
    "R20_IOT_CC" : "11Xf4fX06g3crAXzmVW7VlVCDVwIlue6q",
    "R20_IOT_SE" : "1FL6ImV2jQFIOAcyrOkiWL6iKq-qKSIh1",
    "R20_IOT_ESD" : "1FBhrm-VHvYAaA4YQvbLMBEWdbwLZ3V_D",
    "R20_IOT_ML" : "16IcndjPfN9I665v048ZlYsRIJcduqg80",
    "R20_IOT_SADIOT" : "1Sch7UTFuCnPiIcp-BheX4LpceVVRRm48",
    "R23_IOT_ADAA" : "1mOqvFZo6fMZpWlPEO6XPFRidFZWGb-93",
    "R23_IOT_DLCO" : "1OayL74MDy4c-aCa68PauBfJCPBu2Jd9P",
    "R23_IOT_DMGT" : "1ZVR0l2UkmjvJ9Cs4BsLN7iOrzM7cYVsF",
    "R23_IOT_OOPJ" : "1LAdshcdghBXfdly2jPuO0yPmWUibVqjC",
    "R23_IOT_CN" : "1FKNSV0XLzNKT9-0OYrmbojNOoLWNp1IT",
    "R23_IOT_DTI" : "1n5AhUahf6Uz7sifH8cbJEpPufinPzUsu",
    "R23_IOT_MEFA" : "1rT9036vVYGSrvVuuwQd7Oi4G9N25y4pO",
    "R23_IOT_MPMC" : "1rp5mOzJnJSaDnEo5D6zxY380B4CUupEI",
    "R23_IOT_OS" : "1l25bYJVz0mV0U6Xa3qpgiDiTRm_AG8cB",
    "R23_IOT_P&S" : "1KW42wAf8q2zVk--J_0yq2s5JBxK1BB6q",
    "R23_IOT_FSDI" : "1x2tsbfhAqn_I5mXANMRsZoBtup-yrsfj"
}
//Fetch Subjects from the backend
const fetchSubjects = async (req, res) => {
    const Link = req.body.Link;
    const Regulation = Link.split('.')[0];
    const semester = Link.split('.')[1];
    return res.status(200).json(Subjects[Regulation][semester]);
}
const drive = google.drive({ version: 'v3', auth });
// Fetch data from Google Drive 
const fetchData = async (req, res) => {
    try {
        const {category, fileName} = req.body;
        console.log(fileName, category);
        const FolderId = `${FolderIds[fileName]}`  // Replace with your folder ID
        if (!category) {
            return res.status(400).json({ error: "Category is required." });
        }
        let files = [];
        let nextPageToken = null;
        do {
            const response = await drive.files.list({
                q: `'${FolderId}' in parents and mimeType != 'application/vnd.google-apps.folder'`,
                pageSize: 100,
                fields: 'nextPageToken, files(id, name, mimeType)',
                pageToken: nextPageToken,
            });

            files = files.concat(response.data.files);
            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);
        const filteredFiles = files.filter((file) =>
            file.name.toLowerCase().includes(category.toLowerCase())
        );
        if (filteredFiles.length === 0) {
            return res.status(200).json({ message: "No matching files found." });
        }
        return res.status(200).json(filteredFiles);
    } catch (error) {
        console.error("Error fetching data from Google Drive:", error.message);
        return res.status(500).json({ error: "Failed to fetch data from Google Drive." });
    }
};
// Upload file to Google Drive 
const streamifier = require('streamifier');
const multer = require('multer');

// Multer setup to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
}).fields([{ name: 'file', maxCount: 1 }, { name: 'category', maxCount: 1 }, { name: 'fileName', maxCount: 1 }]);

const uploadFile = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const file = req.files.file[0];
        const category = req.body.category; // Extract category from the parsed form data
        const CustomfileName = req.body.fileName;

        if (!category) {
            return res.status(400).json({ error: "Category is required." });
        }

        // Append category to the file name
        const originalName = file.originalname;
        const fileExtension = originalName.substring(originalName.lastIndexOf('.'));
        const fileName = `${originalName.replace(fileExtension, '')} ${category}${fileExtension}`;

        const fileMetadata = {
            name: fileName, // Use the modified file name
            parents: [`${FolderIds[CustomfileName]}`],
        };

        const media = {
            mimeType: file.mimetype,
            body: streamifier.createReadStream(file.buffer),
        };

        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });
        
        return res.status(200).json({
            message: "File uploaded successfully",
            fileId: response.data.id,
        });
    } catch (error) {
        console.error('Error uploading file to Google Drive:', error.message);
        return res.status(500).json({ error: 'Failed to upload file.' });
    }
};

const handleFileUpload = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error during file upload:', err);
            return res.status(500).json({ error: 'Error during file upload.' });
        }
        await uploadFile(req, res);
    });
};


// Delete a file from Google Drive by its ID
const deleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;  // Get the fileId from the request parameters
        console.log(fileId);
        if (!fileId) {
            return res.status(400).json({ error: "File ID is required." });
        }

        // Delete the file from Google Drive
        await drive.files.delete({
            fileId: fileId,
        });

        return res.status(200).json({
            message: "File deleted successfully.",
        });
    } catch (error) {
        console.error('Error deleting file from Google Drive:', error.message);
        return res.status(500).json({ error: 'Failed to delete file.' });
    }
};


module.exports = { fetchData, handleFileUpload, deleteFile, fetchSubjects }; // Ensure deleteFile is exported
