from fastapi.testclient import TestClient
from main import app, inspect_url
from fastapi import HTTPException

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_empty_content_is_rejected():
    response = client.post("/api/analyze", json={"input_type": "email", "content": "   "})
    assert response.status_code == 422


def test_unknown_input_type_is_rejected():
    response = client.post("/api/analyze", json={"input_type": "phone", "content": "hello"})
    assert response.status_code == 422


def test_url_is_parsed_without_visiting():
    result = inspect_url("http://example.com/login")
    assert result["hostname"] == "example.com"
    assert any("HTTP" in item for item in result["indicators"])


def test_malformed_url_is_rejected():
    try:
        inspect_url("https://")
        assert False, "Expected URL validation to fail"
    except HTTPException as exc:
        assert exc.status_code == 422
