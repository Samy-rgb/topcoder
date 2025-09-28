from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import time

app = Flask(__name__)
CORS(app)

# Mock data storage
users = {'admin': 'admin123', 'user': 'user123'}
assets = []
jobs = {}

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if username in users and users[username] == password:
        return jsonify({
            'token': f'jwt-token-{username}-{int(time.time())}',
            'user': {
                'id': 1 if username == 'admin' else 2,
                'username': username,
                'role': 'admin' if username == 'admin' else 'user',
                'email': f'{username}@example.com'
            }
        })
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/auth/me', methods=['GET'])
def get_current_user():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'No authorization header'}), 401
    
    try:
        # Extract token (remove 'Bearer ' prefix if present)
        token = auth_header.split(' ')[1] if ' ' in auth_header else auth_header
        
        # For demo purposes, extract username from token
        if 'admin' in token:
            return jsonify({
                'user': {
                    'id': 1,
                    'username': 'admin',
                    'role': 'admin',
                    'email': 'admin@example.com'
                }
            })
        elif 'user' in token:
            return jsonify({
                'user': {
                    'id': 2,
                    'username': 'user', 
                    'role': 'user',
                    'email': 'user@example.com'
                }
            })
        else:
            return jsonify({'error': 'Invalid token'}), 401
            
    except Exception as e:
        return jsonify({'error': 'Token validation failed'}), 401

@app.route('/api/generation/providers', methods=['GET'])
def get_providers():
    return jsonify({
        'providers': [
            {
                'id': 'openai',
                'name': 'OpenAI DALL-E',
                'description': 'Advanced AI image generation',
                'icon': '🤖',
                'features': ['High Quality', 'Fast Processing'],
                'isPremium': True
            },
            {
                'id': 'midjourney',
                'name': 'Midjourney',
                'description': 'Artistic AI image creation',
                'icon': '🎨',
                'features': ['Artistic Style', 'Creative Output'],
                'isPremium': True
            },
            {
                'id': 'stable-diffusion',
                'name': 'Stable Diffusion',
                'description': 'Open source image generation',
                'icon': '⚡',
                'features': ['Open Source', 'Customizable'],
                'isPremium': False
            }
        ]
    })

@app.route('/api/assets/upload', methods=['POST'])
def upload_asset():
    asset_id = str(uuid.uuid4())
    asset = {
        'id': asset_id,
        'name': 'uploaded-asset.jpg',
        'url': 'https://via.placeholder.com/800x600',
        'thumbnail': 'https://via.placeholder.com/200x150',
        'size': 1024000,
        'type': 'image/jpeg'
    }
    assets.append(asset)
    return jsonify(asset)

@app.route('/api/assets', methods=['GET'])
def get_assets():
    return jsonify({
        'assets': assets,
        'stats': {
            'totalAssets': len(assets),
            'totalVariants': len(assets) * 3,
            'totalDownloads': 25,
            'successRate': 95
        }
    })

@app.route('/api/generation/generate', methods=['POST'])
def generate_assets():
    job_id = str(uuid.uuid4())
    jobs[job_id] = {
        'id': job_id,
        'status': 'processing',
        'progress': 0,
        'completedAssets': 0,
        'totalAssets': 5
    }
    return jsonify({'job': jobs[job_id]})

@app.route('/api/generation/jobs/<job_id>', methods=['GET'])
def get_job_status(job_id):
    if job_id in jobs:
        # Simulate progress
        job = jobs[job_id]
        if job['progress'] < 100:
            job['progress'] += 20
            job['completedAssets'] = min(job['completedAssets'] + 1, job['totalAssets'])
        if job['progress'] >= 100:
            job['status'] = 'completed'
            job['results'] = [
                {'id': i, 'name': f'Generated Asset {i}', 'platform': 'Instagram'} 
                for i in range(1, 6)
            ]
        return jsonify(job)
    return jsonify({'error': 'Job not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
