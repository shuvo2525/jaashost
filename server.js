const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API 1: GET /api/config
  if (req.method === 'GET' && reqPath === '/api/config') {
    const cfgPath = path.join(BASE_DIR, 'site-config.json');
    if (fs.existsSync(cfgPath)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(fs.readFileSync(cfgPath, 'utf8'));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Config not found' }));
    }
    return;
  }

  // API 2: POST /api/config
  if (req.method === 'POST' && reqPath === '/api/config') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        fs.writeFileSync(path.join(BASE_DIR, 'site-config.json'), JSON.stringify(parsed, null, 2), 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Configuration saved successfully!' }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // API: POST /api/upload & /api/save_image (Full Image & Logo Upload Handler)
  if (req.method === 'POST' && (reqPath === '/api/upload' || reqPath === '/api/save_image')) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        const raw = parsed.base64 || parsed.fileData || parsed.data;
        if (!raw) throw new Error('No image data provided');

        let targetName = parsed.filename || parsed.fileName;
        if (!targetName) {
          const extMatch = raw.match(/^data:image\/(\w+);base64,/);
          const ext = extMatch ? (extMatch[1] === 'jpeg' ? 'jpg' : (extMatch[1] === 'svg+xml' ? 'svg' : extMatch[1])) : 'png';
          targetName = `assets/images/upload_${Date.now()}.${ext}`;
        } else if (!targetName.startsWith('assets/images/')) {
          targetName = `assets/images/${path.basename(targetName)}`;
        }

        const cleanBase64 = raw.replace(/^data:image\/[\w+.-]+;base64,/, '');
        const targetPath = path.join(BASE_DIR, targetName);
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.writeFileSync(targetPath, Buffer.from(cleanBase64, 'base64'));

        console.log('Image uploaded successfully:', targetName);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          url: targetName,
          filename: targetName,
          message: 'Image uploaded successfully!'
        }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // API 3: POST /api/admin/login
  if (req.method === 'POST' && reqPath === '/api/admin/login') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { username, password } = JSON.parse(body);
        const cfgPath = path.join(BASE_DIR, 'site-config.json');
        let adminUser = 'admin';
        let adminPass = 'admin123';
        if (fs.existsSync(cfgPath)) {
          const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
          if (cfg.admin) {
            adminUser = cfg.admin.username || adminUser;
            adminPass = cfg.admin.password || adminPass;
          }
        }

        if ((username === adminUser || username === 'admin@jaasbd.com') && password === adminPass) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            token: 'jaas_auth_' + Buffer.from(username + ':' + Date.now()).toString('base64'),
            username: adminUser
          }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Invalid username or password! Please provide correct credentials.' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // API 4: POST /api/save-rendered-pad
  if (req.method === 'POST' && reqPath === '/api/save-rendered-pad') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        const base64Data = parsed.image.replace(/^data:image\/\w+;base64,/, '');
        fs.writeFileSync(path.join(BASE_DIR, 'assets/images/jaasbd-pad-hd.png'), base64Data, 'base64');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, path: 'assets/images/jaasbd-pad-hd.png' }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // Normalize trailing slash (e.g. /admin/ -> /admin)
  if (reqPath.length > 1 && reqPath.endsWith('/')) {
    reqPath = reqPath.slice(0, -1);
  }

  // API 5: GET & POST /api/orders
  if (reqPath === '/api/orders') {
    const cfgPath = path.join(BASE_DIR, 'site-config.json');
    let cfg = {};
    if (fs.existsSync(cfgPath)) {
      try { cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8')); } catch (e) {}
    }
    cfg.orders = cfg.orders || [];

    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, orders: cfg.orders }));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const order = JSON.parse(body);
          cfg.orders.unshift(order);
          if (order.client && order.client.email) {
            cfg.clients = cfg.clients || [];
            const exIdx = cfg.clients.findIndex(c => c.email && c.email.toLowerCase() === order.client.email.toLowerCase());
            if (exIdx >= 0) {
              cfg.clients[exIdx] = { ...cfg.clients[exIdx], ...order.client };
            } else {
              cfg.clients.push(order.client);
            }
          }
          fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2), 'utf8');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Order recorded successfully!' }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
      });
      return;
    }
  }

  // API 6: GET & POST /api/clients (Client Registry for Purchase Authentication)
  if (reqPath === '/api/clients') {
    const cfgPath = path.join(BASE_DIR, 'site-config.json');
    let cfg = {};
    if (fs.existsSync(cfgPath)) {
      try { cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8')); } catch (e) {}
    }
    cfg.clients = cfg.clients || [];

    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, clients: cfg.clients }));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const clientData = JSON.parse(body);
          if (!clientData.email) throw new Error('Email is required');
          const exIdx = cfg.clients.findIndex(c => c.email && c.email.toLowerCase() === clientData.email.toLowerCase());
          if (exIdx >= 0) {
            cfg.clients[exIdx] = { ...cfg.clients[exIdx], ...clientData };
          } else {
            cfg.clients.push(clientData);
          }
          fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2), 'utf8');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Client registered successfully!', client: clientData }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
      });
      return;
    }
  }

  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  } else if (reqPath === '/login' || reqPath === '/login.php' || (reqPath === '/index.php' && req.url.includes('rp=/login'))) {
    reqPath = '/login.html';
  } else if (reqPath === '/index.php' && (req.url.includes('rp=') || req.url.includes('store'))) {
    reqPath = '/cart.html';
  } else if (reqPath === '/index.php') {
    reqPath = '/index.html';
  } else if (reqPath.startsWith('/store') || req.url.includes('rp=/store')) {
    reqPath = '/cart.html';
  } else if (reqPath === '/cart.php' || reqPath === '/cart' || reqPath === '/order' || reqPath === '/order.html') {
    reqPath = '/cart.html';
  } else if (reqPath === '/basic-hosting' || reqPath === '/basic-hosting.php') {
    reqPath = '/basic-hosting.html';
  } else if (reqPath === '/pro-hosting' || reqPath === '/pro-hosting.php') {
    reqPath = '/pro-hosting.html';
  } else if (reqPath === '/premium-hosting' || reqPath === '/premium-hosting.php') {
    reqPath = '/premium-hosting.html';
  } else if (reqPath === '/bdix-basic' || reqPath === '/bdix-basic.php' || reqPath === '/bdix-hosting' || reqPath === '/bdix-hosting.php') {
    reqPath = '/bdix-basic.html';
  } else if (reqPath === '/bdix-premium' || reqPath === '/bdix-premium.php') {
    reqPath = '/bdix-premium.html';
  } else if (reqPath === '/reseller-hosting' || reqPath === '/reseller-hosting.php' || reqPath === '/reseller') {
    reqPath = '/reseller-hosting.html';
  } else if (reqPath === '/domain-reseller') {
    reqPath = '/domain.html';
  } else if (reqPath === '/bdix-reseller') {
    reqPath = '/reseller-hosting.html';
  } else if (reqPath === '/vps' || reqPath === '/vps.php' || reqPath === '/vps-server' || reqPath === '/bdix-vps' || reqPath === '/rdp-server' || reqPath === '/backup') {
    reqPath = '/vps.html';
  } else if (reqPath === '/dedicated' || reqPath === '/dedicated.php' || reqPath === '/dedicated-server') {
    reqPath = '/dedicated.html';
  } else if (reqPath === '/email-hosting' || reqPath === '/email-hosting.php' || reqPath === '/radio-hosting') {
    reqPath = '/email-hosting.html';
  } else if (reqPath === '/charity-hosting' || reqPath === '/free-hosting-for-charities' || reqPath === '/bulk-sms' || reqPath === '/bulk-mail' || reqPath === '/whmcs-solution' || reqPath === '/graphics-design') {
    reqPath = '/basic-hosting.html';
  } else if (reqPath === '/clientarea' || reqPath === '/clientarea.php' || reqPath === '/account' || reqPath === '/accounts') {
    reqPath = '/clientarea.html';
  } else if (reqPath === '/domain' || reqPath === '/domain.php' || reqPath === '/bd-domain') {
    reqPath = '/domain.html';
  } else if (reqPath === '/invoice' || reqPath === '/invoice.php') {
    reqPath = '/invoice.html';
  } else if (reqPath === '/admin' || reqPath === '/admin.php' || reqPath === '/admin/login') {
    reqPath = '/admin-login.html';
  } else if (reqPath === '/admin/dashboard' || reqPath === '/admin-dashboard') {
    reqPath = '/admin.html';
  }

  const filePath = path.normalize(path.join(BASE_DIR, reqPath));

  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`JAAS BD Server listening on http://localhost:${PORT} and http://127.0.0.1:${PORT}`);
});
