import {addDoc, collection} from "firebase/firestore";
import {string_to_slug} from "../helper.js";

const initData = async () =>
{
    try
    {
        const data = [
            {
                name: "Tào Tháo (Cao Cao)",
                positions: [
                    {
                        name: "King of Wei",
                        tenure: [216, 220]
                    },
                    {
                        name: "Duke of Wei",
                        tenure: [213, 216]
                    },
                    {
                        name: "Imperial Chancellor",
                        tenure: [208, 220]
                    },
                    {
                        name: "Minister of Works",
                        tenure: [196, 208]
                    }
                ],
                bio: {
                    born: {
                        year: 155,
                        place: "Qiao County, Pei State, Han Empire"
                    },
                    died: {
                        year: 220,
                        place: "Luoyang, Han Empire"
                    },
                    burial: {
                        date: "11 April 220",
                        place: "Cao Cao Mausoleum"
                    },
                    house: {
                        farther: "Cao Song",
                        mother: "Lady Ding"
                    }
                },
                imageLink: "data:image/jpeg;base64,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",
                infoLink: "https://en.wikipedia.org/wiki/Cao_Cao",
                isFavorite: false,
                slug: string_to_slug("Tào Tháo")
            },
            {
                name: "Lưu Bị (Liu Bei)",
                positions: [
                    {
                        name: "King of Hanzhong",
                        tenure: [219, 221]
                    },
                    {
                        name: "Emperor of Shu Han",
                        tenure: [221, 223]
                    }
                ],
                bio: {
                    born: {
                        year: 161,
                        place: "Zhuo County, Zhuo Commandery, Han Empire (present-day Zhuozhou, Baoding, Hebei)"
                    },
                    died: {
                        year: 223,
                        place: "Baidicheng, Shu Han"
                    },
                    burial: {
                        date: "Unknown",
                        place: "Hui Mausoleum, Chengdu, Sichuan"
                    },
                    house: {
                        farther: "Liu Hong",
                        mother: "Unknown"
                    }
                },
                imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Liu_Bei_Tang.jpg/330px-Liu_Bei_Tang.jpg",
                infoLink: "https://en.wikipedia.org/wiki/Liu_Bei",
                isFavorite: false,
                slug: string_to_slug("Lưu Bị")
            },
            {
                name: "Tôn Quyền (Sun Quan)",
                positions: [
                    {
                        name: "Emperor of Eastern Wu",
                        tenure: [229, 252]
                    },
                    {
                        name: "King of Wu",
                        tenure: [221, 222]
                    },
                    {
                        name: "Marquis of Nanchang",
                        tenure: [219, 221]
                    }
                ],
                bio: {
                    born: {
                        year: 182,
                        place: "Han Empire"
                    },
                    died: {
                        year: 252,
                        place: "Jianye, Eastern Wu"
                    },
                    burial: {
                        date: "Unknown",
                        place: "Purple Mountain"
                    },
                    house: {
                        farther: "Sun Jian",
                        mother: "Lady Wu"
                    }
                },
                imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sun_Quan_Tang.jpg/330px-Sun_Quan_Tang.jpg",
                infoLink: "https://en.wikipedia.org/wiki/Sun_Quan",
                isFavorite: false,
                slug: string_to_slug("Tôn Quyền")
            }
        ];

        for (const item of data)
        {
            const docRef = await addDoc(collection(db, "characters"), item);
            console.log("Document written with ID: ", docRef.id);
        }
    }
    catch (e)
    {
        console.error("Error adding document: ", e);
    }
};

initData();
