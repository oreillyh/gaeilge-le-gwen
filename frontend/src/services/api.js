const API_BASE = 'http://localhost:5001/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE;
  }

  getAuthHeaders() {
    const token = localStorage.getItem('admin_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Public endpoints
  async getTopics() {
    const response = await fetch(`${this.baseUrl}/topics`);
    return response.json();
  }

  async getTopic(id) {
    const response = await fetch(`${this.baseUrl}/topics/${id}`);
    return response.json();
  }

  // Admin endpoints
  async adminGetTopics() {
    const response = await fetch(`${this.baseUrl}/admin/topics`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async createTopic(topicData) {
    const response = await fetch(`${this.baseUrl}/admin/topics`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(topicData)
    });
    return response.json();
  }

  async updateTopic(id, topicData) {
    const response = await fetch(`${this.baseUrl}/admin/topics/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(topicData)
    });
    return response.json();
  }

  async deleteTopic(id) {
    const response = await fetch(`${this.baseUrl}/admin/topics/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  // AI endpoints
  async aiChat(message, context = '') {
    const response = await fetch(`${this.baseUrl}/admin/ai/chat`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ message, context })
    });
    return response.json();
  }

  async aiGenerateTopic(request) {
    const response = await fetch(`${this.baseUrl}/admin/ai/generate-topic`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ request })
    });
    return response.json();
  }
}

export default new ApiService();
