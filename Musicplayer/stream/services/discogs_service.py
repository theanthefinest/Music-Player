import requests

class DiscogsService:
    def __init__(self, api_key):
        self.base_url = "https://api.discogs.com/"
        self.api_key = api_key

    def search_tracks(self, query, limit=10):
        """
        Search for tracks on Discogs based on a query.
        """
        headers = {
            "Authorization": f"Discogs token={self.api_key}"
        }

        params = {
            "q": query,
            "type": "release",
            "per_page": limit
        }

        try:
            response = requests.get(f"{self.base_url}database/search", headers=headers, params=params)
            response.raise_for_status()  # Raise an error for HTTP errors
            return response.json()  # Return the JSON response
        except requests.exceptions.RequestException as e:
            print(f"Error fetching tracks from Discogs: {e}")
            return None