import HoSo from '../models/HoSo';

class HoSoService {
  static BASE_URL = import.meta.env.VITE_API_BASE_URL;

  static async getHoSoList() {
    try {
      const response = await fetch(`${this.BASE_URL}/ho-so`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiData = await response.json();
      return HoSo.fromApiArray(apiData);
    } catch (error) {
      console.error('Error fetching ho so data from API:', error);
      throw error;
    }
  }

  static async getHoSoById(id) {
    try {
      const response = await fetch(`${this.BASE_URL}/ho-so/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiData = await response.json();
      return new HoSo(apiData);
    } catch (error) {
      console.error('Error fetching ho so by id:', error);
      throw error;
    }
  }

  static async createHoSo(hoSoData) {
    try {
      const response = await fetch(`${this.BASE_URL}/ho-so`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hoSoData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiData = await response.json();
      return new HoSo(apiData);
    } catch (error) {
      console.error('Error creating ho so:', error);
      throw error;
    }
  }

  static async updateHoSo(id, hoSoData) {
    try {
      const response = await fetch(`${this.BASE_URL}/ho-so/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hoSoData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiData = await response.json();
      return new HoSo(apiData);
    } catch (error) {
      console.error('Error updating ho so:', error);
      throw error;
    }
  }

  static async deleteHoSo(id) {
    try {
      const response = await fetch(`${this.BASE_URL}/ho-so/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error('Error deleting ho so:', error);
      throw error;
    }
  }
}

export default HoSoService;
