#!/usr/bin/env python3
"""
Backend API Testing for IndusVertex Phase 2
Tests all authentication and protected endpoints
"""
import requests
import json
import sys

BASE_URL = "https://infrastructure-hub-53.preview.emergentagent.com/api"
ADMIN_EMAIL = "admin@indusvertex.com"
ADMIN_PASSWORD = "IndusVertex@2025"

# Global token storage
auth_token = None
test_blog_id = None
test_blog_slug = None

def print_test(name, passed, details=""):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {name}")
    if details:
        print(f"   {details}")
    print()

def test_auth_login_valid():
    """Test 1: POST /api/auth/login with valid credentials"""
    global auth_token
    try:
        response = requests.post(f"{BASE_URL}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        }, timeout=10)
        
        data = response.json()
        
        if response.status_code == 200:
            if data.get("success") and data.get("token") and data.get("user"):
                user = data.get("user", {})
                if user.get("email") == ADMIN_EMAIL and user.get("role") == "admin":
                    auth_token = data.get("token")
                    print_test("Auth Login Valid", True, f"Token received: {auth_token[:20]}...")
                    return True
                else:
                    print_test("Auth Login Valid", False, f"User data incorrect: {user}")
                    return False
            else:
                print_test("Auth Login Valid", False, f"Missing fields in response: {data}")
                return False
        else:
            print_test("Auth Login Valid", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("Auth Login Valid", False, f"Exception: {str(e)}")
        return False

def test_auth_login_invalid():
    """Test 2: POST /api/auth/login with wrong password"""
    try:
        response = requests.post(f"{BASE_URL}/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": "WrongPassword123"
        }, timeout=10)
        
        data = response.json()
        
        if response.status_code == 401 and data.get("error") == "Invalid credentials":
            print_test("Auth Login Invalid Password", True, "Correctly rejected with 401")
            return True
        else:
            print_test("Auth Login Invalid Password", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("Auth Login Invalid Password", False, f"Exception: {str(e)}")
        return False

def test_auth_me_with_token():
    """Test 3: GET /api/auth/me with valid token"""
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/auth/me", headers=headers, timeout=10)
        
        data = response.json()
        
        if response.status_code == 200:
            user = data.get("user", {})
            if user.get("email") == ADMIN_EMAIL and user.get("role") == "admin":
                print_test("Auth /me With Token", True, f"User: {user}")
                return True
            else:
                print_test("Auth /me With Token", False, f"User data incorrect: {user}")
                return False
        else:
            print_test("Auth /me With Token", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("Auth /me With Token", False, f"Exception: {str(e)}")
        return False

def test_auth_me_without_token():
    """Test 4: GET /api/auth/me without token"""
    try:
        response = requests.get(f"{BASE_URL}/auth/me", timeout=10)
        data = response.json()
        
        if response.status_code == 401:
            print_test("Auth /me Without Token", True, "Correctly rejected with 401")
            return True
        else:
            print_test("Auth /me Without Token", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("Auth /me Without Token", False, f"Exception: {str(e)}")
        return False

def test_auth_me_malformed_token():
    """Test 5: GET /api/auth/me with malformed token"""
    try:
        headers = {"Authorization": "Bearer invalid.token.here"}
        response = requests.get(f"{BASE_URL}/auth/me", headers=headers, timeout=10)
        data = response.json()
        
        if response.status_code == 401:
            print_test("Auth /me Malformed Token", True, "Correctly rejected with 401")
            return True
        else:
            print_test("Auth /me Malformed Token", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("Auth /me Malformed Token", False, f"Exception: {str(e)}")
        return False

def test_leads_with_token():
    """Test 6: GET /api/leads with token"""
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/leads", headers=headers, timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "leads" in data:
            print_test("GET /leads With Token", True, f"Retrieved {len(data['leads'])} leads")
            return True
        else:
            print_test("GET /leads With Token", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /leads With Token", False, f"Exception: {str(e)}")
        return False

def test_leads_without_token():
    """Test 6b: GET /api/leads without token"""
    try:
        response = requests.get(f"{BASE_URL}/leads", timeout=10)
        data = response.json()
        
        if response.status_code == 401:
            print_test("GET /leads Without Token", True, "Correctly rejected with 401")
            return True
        else:
            print_test("GET /leads Without Token", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /leads Without Token", False, f"Exception: {str(e)}")
        return False

def test_applications_with_token():
    """Test 7: GET /api/applications with token"""
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/applications", headers=headers, timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "applications" in data:
            print_test("GET /applications With Token", True, f"Retrieved {len(data['applications'])} applications")
            return True
        else:
            print_test("GET /applications With Token", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /applications With Token", False, f"Exception: {str(e)}")
        return False

def test_applications_without_token():
    """Test 7b: GET /api/applications without token"""
    try:
        response = requests.get(f"{BASE_URL}/applications", timeout=10)
        data = response.json()
        
        if response.status_code == 401:
            print_test("GET /applications Without Token", True, "Correctly rejected with 401")
            return True
        else:
            print_test("GET /applications Without Token", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /applications Without Token", False, f"Exception: {str(e)}")
        return False

def test_blogs_list():
    """Test 8: GET /api/blogs - should return at least 4 seeded blogs"""
    try:
        response = requests.get(f"{BASE_URL}/blogs", timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "blogs" in data:
            blogs = data["blogs"]
            if len(blogs) >= 4:
                # Check structure of first blog
                blog = blogs[0]
                required_fields = ["id", "slug", "title", "excerpt", "content", "category", "tags", "author", "image", "createdAt"]
                missing = [f for f in required_fields if f not in blog]
                
                if not missing:
                    # Check for specific seeded blogs
                    titles = [b.get("title", "") for b in blogs]
                    expected_titles = [
                        "The Future of Data Centre Design in India",
                        "CEIG Approvals",
                        "Solar + BESS",
                        "EV Infrastructure"
                    ]
                    found = sum(1 for exp in expected_titles if any(exp in t for t in titles))
                    
                    print_test("GET /blogs List", True, f"Found {len(blogs)} blogs with correct structure, {found}/4 expected titles")
                    return True
                else:
                    print_test("GET /blogs List", False, f"Missing fields: {missing}")
                    return False
            else:
                print_test("GET /blogs List", False, f"Only {len(blogs)} blogs, expected >= 4")
                return False
        else:
            print_test("GET /blogs List", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /blogs List", False, f"Exception: {str(e)}")
        return False

def test_blogs_search():
    """Test 9: GET /api/blogs?q=data - search filter"""
    try:
        response = requests.get(f"{BASE_URL}/blogs?q=data", timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "blogs" in data:
            blogs = data["blogs"]
            if len(blogs) > 0:
                # Check if results contain 'data' in title/excerpt/content/tags
                blog = blogs[0]
                text = f"{blog.get('title','')} {blog.get('excerpt','')} {blog.get('content','')} {' '.join(blog.get('tags',[]))}".lower()
                if "data" in text:
                    print_test("GET /blogs Search", True, f"Found {len(blogs)} blogs matching 'data'")
                    return True
                else:
                    print_test("GET /blogs Search", False, f"Results don't contain 'data': {blog.get('title')}")
                    return False
            else:
                print_test("GET /blogs Search", False, "No results for 'data' search")
                return False
        else:
            print_test("GET /blogs Search", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /blogs Search", False, f"Exception: {str(e)}")
        return False

def test_blogs_category():
    """Test 10: GET /api/blogs?category=Compliance"""
    try:
        response = requests.get(f"{BASE_URL}/blogs?category=Compliance", timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "blogs" in data:
            blogs = data["blogs"]
            if len(blogs) > 0:
                # Check if all results are Compliance category
                all_compliance = all(b.get("category") == "Compliance" for b in blogs)
                if all_compliance:
                    print_test("GET /blogs Category Filter", True, f"Found {len(blogs)} Compliance blogs")
                    return True
                else:
                    print_test("GET /blogs Category Filter", False, "Results contain non-Compliance blogs")
                    return False
            else:
                print_test("GET /blogs Category Filter", False, "No Compliance blogs found")
                return False
        else:
            print_test("GET /blogs Category Filter", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /blogs Category Filter", False, f"Exception: {str(e)}")
        return False

def test_blogs_by_slug():
    """Test 11: GET /api/blogs/future-of-data-centre-design-in-india"""
    try:
        response = requests.get(f"{BASE_URL}/blogs/future-of-data-centre-design-in-india", timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "blog" in data:
            blog = data["blog"]
            if blog.get("slug") == "future-of-data-centre-design-in-india":
                print_test("GET /blogs By Slug", True, f"Retrieved blog: {blog.get('title')}")
                return True
            else:
                print_test("GET /blogs By Slug", False, f"Wrong slug: {blog.get('slug')}")
                return False
        else:
            print_test("GET /blogs By Slug", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /blogs By Slug", False, f"Exception: {str(e)}")
        return False

def test_blogs_nonexistent_slug():
    """Test 12: GET /api/blogs/nonexistent-slug-12345"""
    try:
        response = requests.get(f"{BASE_URL}/blogs/nonexistent-slug-12345", timeout=10)
        data = response.json()
        
        if response.status_code == 404 and data.get("error") == "Not found":
            print_test("GET /blogs Nonexistent Slug", True, "Correctly returned 404")
            return True
        else:
            print_test("GET /blogs Nonexistent Slug", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /blogs Nonexistent Slug", False, f"Exception: {str(e)}")
        return False

def test_blogs_post_without_auth():
    """Test 13: POST /api/blogs without auth"""
    try:
        response = requests.post(f"{BASE_URL}/blogs", json={
            "title": "Test Blog",
            "excerpt": "Test excerpt",
            "content": "<p>Test content</p>",
            "category": "Test"
        }, timeout=10)
        data = response.json()
        
        if response.status_code == 401:
            print_test("POST /blogs Without Auth", True, "Correctly rejected with 401")
            return True
        else:
            print_test("POST /blogs Without Auth", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("POST /blogs Without Auth", False, f"Exception: {str(e)}")
        return False

def test_blogs_post_with_auth():
    """Test 14: POST /api/blogs with auth"""
    global test_blog_id, test_blog_slug
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.post(f"{BASE_URL}/blogs", headers=headers, json={
            "title": "Test Blog",
            "excerpt": "Test excerpt",
            "content": "<p>hello</p>",
            "category": "Test",
            "tags": ["a", "b"]
        }, timeout=10)
        data = response.json()
        
        if response.status_code == 200 and data.get("success"):
            blog = data.get("blog", {})
            test_blog_id = blog.get("id")
            test_blog_slug = blog.get("slug")
            
            if test_blog_slug == "test-blog":
                print_test("POST /blogs With Auth", True, f"Created blog with slug: {test_blog_slug}, id: {test_blog_id}")
                return True
            else:
                print_test("POST /blogs With Auth", False, f"Slug not auto-generated correctly: {test_blog_slug}")
                return False
        else:
            print_test("POST /blogs With Auth", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("POST /blogs With Auth", False, f"Exception: {str(e)}")
        return False

def test_blogs_get_created():
    """Test 15: GET /api/blogs/test-blog after creation"""
    try:
        response = requests.get(f"{BASE_URL}/blogs/{test_blog_slug}", timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "blog" in data:
            blog = data["blog"]
            if blog.get("title") == "Test Blog":
                print_test("GET /blogs Created Blog", True, f"Retrieved created blog: {blog.get('title')}")
                return True
            else:
                print_test("GET /blogs Created Blog", False, f"Wrong title: {blog.get('title')}")
                return False
        else:
            print_test("GET /blogs Created Blog", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /blogs Created Blog", False, f"Exception: {str(e)}")
        return False

def test_blogs_put():
    """Test 16: PUT /api/blogs/<id> with auth"""
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.put(f"{BASE_URL}/blogs/{test_blog_id}", headers=headers, json={
            "title": "Updated Test Blog"
        }, timeout=10)
        data = response.json()
        
        if response.status_code == 200 and data.get("success"):
            print_test("PUT /blogs With Auth", True, f"Updated blog {test_blog_id}")
            return True
        else:
            print_test("PUT /blogs With Auth", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("PUT /blogs With Auth", False, f"Exception: {str(e)}")
        return False

def test_blogs_delete():
    """Test 17: DELETE /api/blogs/<id> with auth"""
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.delete(f"{BASE_URL}/blogs/{test_blog_id}", headers=headers, timeout=10)
        data = response.json()
        
        if response.status_code == 200 and data.get("success"):
            print_test("DELETE /blogs With Auth", True, f"Deleted blog {test_blog_id}")
            return True
        else:
            print_test("DELETE /blogs With Auth", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("DELETE /blogs With Auth", False, f"Exception: {str(e)}")
        return False

def test_team_list():
    """Test 18: GET /api/team - should return at least 4 seeded members"""
    try:
        response = requests.get(f"{BASE_URL}/team", timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "team" in data:
            team = data["team"]
            if len(team) >= 4:
                print_test("GET /team List", True, f"Found {len(team)} team members")
                return True
            else:
                print_test("GET /team List", False, f"Only {len(team)} members, expected >= 4")
                return False
        else:
            print_test("GET /team List", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /team List", False, f"Exception: {str(e)}")
        return False

def test_clients_list():
    """Test 19: GET /api/clients - should return 14 seeded clients"""
    try:
        response = requests.get(f"{BASE_URL}/clients", timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "clients" in data:
            clients = data["clients"]
            if len(clients) >= 14:
                print_test("GET /clients List", True, f"Found {len(clients)} clients")
                return True
            else:
                print_test("GET /clients List", False, f"Only {len(clients)} clients, expected >= 14")
                return False
        else:
            print_test("GET /clients List", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /clients List", False, f"Exception: {str(e)}")
        return False

def test_testimonials_list():
    """Test 20: GET /api/testimonials - should return at least 3"""
    try:
        response = requests.get(f"{BASE_URL}/testimonials", timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "testimonials" in data:
            testimonials = data["testimonials"]
            if len(testimonials) >= 3:
                print_test("GET /testimonials List", True, f"Found {len(testimonials)} testimonials")
                return True
            else:
                print_test("GET /testimonials List", False, f"Only {len(testimonials)} testimonials, expected >= 3")
                return False
        else:
            print_test("GET /testimonials List", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /testimonials List", False, f"Exception: {str(e)}")
        return False

def test_team_post_without_auth():
    """Test 21a: POST /api/team without auth"""
    try:
        response = requests.post(f"{BASE_URL}/team", json={
            "name": "Test Person",
            "role": "Test Role",
            "bio": "Test bio"
        }, timeout=10)
        data = response.json()
        
        if response.status_code == 401:
            print_test("POST /team Without Auth", True, "Correctly rejected with 401")
            return True
        else:
            print_test("POST /team Without Auth", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("POST /team Without Auth", False, f"Exception: {str(e)}")
        return False

def test_team_post_with_auth():
    """Test 21b: POST /api/team with auth"""
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.post(f"{BASE_URL}/team", headers=headers, json={
            "name": "Test Person",
            "role": "Test Role",
            "bio": "Test bio"
        }, timeout=10)
        data = response.json()
        
        if response.status_code == 200 and data.get("success"):
            print_test("POST /team With Auth", True, "Created team member")
            return True
        else:
            print_test("POST /team With Auth", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("POST /team With Auth", False, f"Exception: {str(e)}")
        return False

def test_projects_post_without_auth():
    """Test 22: POST /api/projects without auth"""
    try:
        response = requests.post(f"{BASE_URL}/projects", json={
            "title": "Test Project",
            "client": "Test Client",
            "description": "Test description"
        }, timeout=10)
        data = response.json()
        
        if response.status_code == 401:
            print_test("POST /projects Without Auth", True, "Correctly rejected with 401")
            return True
        else:
            print_test("POST /projects Without Auth", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("POST /projects Without Auth", False, f"Exception: {str(e)}")
        return False

def test_projects_post_with_auth():
    """Test 22b: POST /api/projects with auth"""
    global test_project_id
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.post(f"{BASE_URL}/projects", headers=headers, json={
            "title": "Test Project",
            "client": "Test Client",
            "description": "Test description"
        }, timeout=10)
        data = response.json()
        
        if response.status_code == 200 and data.get("success"):
            test_project_id = data.get("project", {}).get("id")
            print_test("POST /projects With Auth", True, f"Created project {test_project_id}")
            return True
        else:
            print_test("POST /projects With Auth", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("POST /projects With Auth", False, f"Exception: {str(e)}")
        return False

def test_careers_post_without_auth():
    """Test 23: POST /api/careers without auth"""
    try:
        response = requests.post(f"{BASE_URL}/careers", json={
            "title": "Test Job",
            "department": "Test Dept",
            "description": "Test description"
        }, timeout=10)
        data = response.json()
        
        if response.status_code == 401:
            print_test("POST /careers Without Auth", True, "Correctly rejected with 401")
            return True
        else:
            print_test("POST /careers Without Auth", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("POST /careers Without Auth", False, f"Exception: {str(e)}")
        return False

def test_careers_post_with_auth():
    """Test 23b: POST /api/careers with auth"""
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.post(f"{BASE_URL}/careers", headers=headers, json={
            "title": "Test Job",
            "department": "Test Dept",
            "description": "Test description"
        }, timeout=10)
        data = response.json()
        
        if response.status_code == 200 and data.get("success"):
            print_test("POST /careers With Auth", True, "Created job")
            return True
        else:
            print_test("POST /careers With Auth", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("POST /careers With Auth", False, f"Exception: {str(e)}")
        return False

def test_projects_delete_without_auth():
    """Test 24a: DELETE /api/projects/<id> without auth"""
    try:
        # Use a dummy ID
        response = requests.delete(f"{BASE_URL}/projects/dummy-id", timeout=10)
        data = response.json()
        
        if response.status_code == 401:
            print_test("DELETE /projects Without Auth", True, "Correctly rejected with 401")
            return True
        else:
            print_test("DELETE /projects Without Auth", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("DELETE /projects Without Auth", False, f"Exception: {str(e)}")
        return False

def test_projects_delete_with_auth():
    """Test 24b: DELETE /api/projects/<id> with auth"""
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        # Use the project ID from earlier test
        response = requests.delete(f"{BASE_URL}/projects/{test_project_id}", headers=headers, timeout=10)
        data = response.json()
        
        if response.status_code == 200 and data.get("success"):
            print_test("DELETE /projects With Auth", True, f"Deleted project {test_project_id}")
            return True
        else:
            print_test("DELETE /projects With Auth", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("DELETE /projects With Auth", False, f"Exception: {str(e)}")
        return False

def test_search_with_query():
    """Test 25: GET /api/search?q=data"""
    try:
        response = requests.get(f"{BASE_URL}/search?q=data", timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "results" in data:
            results = data["results"]
            if len(results) > 0:
                # Check structure
                result = results[0]
                required_fields = ["type", "title", "excerpt", "url"]
                missing = [f for f in required_fields if f not in result]
                
                if not missing:
                    print_test("GET /search With Query", True, f"Found {len(results)} results with correct structure")
                    return True
                else:
                    print_test("GET /search With Query", False, f"Missing fields: {missing}")
                    return False
            else:
                print_test("GET /search With Query", False, "No results for 'data' search")
                return False
        else:
            print_test("GET /search With Query", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /search With Query", False, f"Exception: {str(e)}")
        return False

def test_search_empty_query():
    """Test 26: GET /api/search?q= (empty query)"""
    try:
        response = requests.get(f"{BASE_URL}/search?q=", timeout=10)
        data = response.json()
        
        if response.status_code == 200 and "results" in data:
            results = data["results"]
            if len(results) == 0:
                print_test("GET /search Empty Query", True, "Correctly returned empty results")
                return True
            else:
                print_test("GET /search Empty Query", False, f"Expected empty results, got {len(results)}")
                return False
        else:
            print_test("GET /search Empty Query", False, f"Status {response.status_code}: {data}")
            return False
    except Exception as e:
        print_test("GET /search Empty Query", False, f"Exception: {str(e)}")
        return False

# Global variable for project ID
test_project_id = None

def main():
    print("=" * 80)
    print("IndusVertex Phase 2 Backend API Testing")
    print("=" * 80)
    print()
    
    results = []
    
    # AUTH TESTS
    print("=" * 80)
    print("AUTH TESTS")
    print("=" * 80)
    results.append(test_auth_login_valid())
    results.append(test_auth_login_invalid())
    results.append(test_auth_me_with_token())
    results.append(test_auth_me_without_token())
    results.append(test_auth_me_malformed_token())
    
    # PROTECTED ENDPOINTS
    print("=" * 80)
    print("PROTECTED ENDPOINTS TESTS")
    print("=" * 80)
    results.append(test_leads_with_token())
    results.append(test_leads_without_token())
    results.append(test_applications_with_token())
    results.append(test_applications_without_token())
    
    # BLOG TESTS
    print("=" * 80)
    print("BLOG TESTS")
    print("=" * 80)
    results.append(test_blogs_list())
    results.append(test_blogs_search())
    results.append(test_blogs_category())
    results.append(test_blogs_by_slug())
    results.append(test_blogs_nonexistent_slug())
    results.append(test_blogs_post_without_auth())
    results.append(test_blogs_post_with_auth())
    results.append(test_blogs_get_created())
    results.append(test_blogs_put())
    results.append(test_blogs_delete())
    
    # TEAM / CLIENTS / TESTIMONIALS
    print("=" * 80)
    print("TEAM / CLIENTS / TESTIMONIALS TESTS")
    print("=" * 80)
    results.append(test_team_list())
    results.append(test_clients_list())
    results.append(test_testimonials_list())
    results.append(test_team_post_without_auth())
    results.append(test_team_post_with_auth())
    
    # PROJECTS / CAREERS WRITE PROTECTION
    print("=" * 80)
    print("PROJECTS / CAREERS WRITE PROTECTION TESTS")
    print("=" * 80)
    results.append(test_projects_post_without_auth())
    results.append(test_projects_post_with_auth())
    results.append(test_careers_post_without_auth())
    results.append(test_careers_post_with_auth())
    results.append(test_projects_delete_without_auth())
    results.append(test_projects_delete_with_auth())
    
    # SEARCH
    print("=" * 80)
    print("SEARCH TESTS")
    print("=" * 80)
    results.append(test_search_with_query())
    results.append(test_search_empty_query())
    
    # SUMMARY
    print("=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total}")
    print(f"Failed: {total - passed}/{total}")
    
    if passed == total:
        print("\n✅ ALL TESTS PASSED!")
        sys.exit(0)
    else:
        print(f"\n❌ {total - passed} TESTS FAILED")
        sys.exit(1)

if __name__ == "__main__":
    main()
