import React, { useState } from "react";
import { Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (city.trim()) {
        onSearch(city);
        setCity("");
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={10} md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleSearch}
              className="custom-input"
            />
            <InputGroup.Text className="custom-icon">
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
