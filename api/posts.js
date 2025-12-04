// API endpoint for retrieving and submitting dialect posts
let posts = [
  {
    id: 1,
    author: '老广阿强',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
    dialect: '粤语',
    regionId: 'yue',
    content: '做人最紧要系开心',
    translation: '做人最重要的是开心',
    time: '10分钟前',
    duration: 5,
    currentTime: 0,
    isPlaying: false,
    likes: 124,
    verified: true
  },
  {
    id: 2,
    author: '成都辣妹',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Molly',
    dialect: '四川话',
    regionId: 'north',
    content: '今天吃火锅，巴适得板！',
    translation: '今天吃火锅，非常舒服！',
    time: '25分钟前',
    duration: 8,
    currentTime: 0,
    isPlaying: false,
    likes: 89,
    verified: true
  }
];

export default async function handler(req, res) {
  // Handle GET requests: return the list of posts
  if (req.method === 'GET') {
    res.status(200).json(posts);
    return;
  }

  // Handle POST requests: add a new post to the list
  if (req.method === 'POST') {
    let data = req.body;
    // If the body is a string, attempt to parse it as JSON
    if (!data || typeof data !== 'object') {
      try {
        data = JSON.parse(req.body);
      } catch (err) {
        data = {};
      }
    }
    const newPost = {
      id: Date.now(),
      author: data.author || '匿名',
      avatar: data.avatar || '',
      dialect: data.dialect || '',
      regionId: data.regionId || 'all',
      content: data.content || '',
      translation: data.translation || '',
      time: '刚刚',
      duration: data.duration || 3,
      currentTime: 0,
      isPlaying: false,
      likes: 0,
      verified: false
    };
    posts.unshift(newPost);
    res.status(201).json(newPost);
    return;
  }

  // Return 405 for any other HTTP methods
  res.status(405).json({ message: 'Method Not Allowed' });
}
