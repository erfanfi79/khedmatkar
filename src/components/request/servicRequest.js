import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FormControl,
  Container,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import urls from "../../common/urls";
import { useFetch } from "../../utils/useFetch";

import Transportation from "./serviceTypes/Transportation";
const ServiceRequest = ({}) => {

  const [mainSpecialty, setMainSpecialty] = useState(null);
  const [specialtyList, setSpecialityList] = useState(null);
  const { data, error, loading } = useFetch(
    urls.speciality.getAll(true),
    "GET"
  );
  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_RIGHT });
    }
    setSpecialityList(data);
  }, [error, data]);

  function makeRequest() {
    toast.success("ثبت درخواست خدمت با موفقیت انجام شد.", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
  return (
    <Container>
      <Form dir="rtl" onSubmit={makeRequest}>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>توضیحات</Form.Label>
          <Form.Control as="textarea" rows={3} />{" "}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress">
          <Form.Label>آدرس</Form.Label>
          <Form.Control placeholder="ادرس خود را وارد کنید." />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>شهر</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>استان</Form.Label>
            <Form.Select defaultValue="انتخاب کنید...">
              <option>تهران</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>تاریخ</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="serviceType">
          <Form.Label>نوع خدمت</Form.Label>
          <Form.Select onChange={(e)=>setMainSpecialty(e.target.options[e.target.selectedIndex].id)}>
            {specialtyList &&
              specialtyList.map((s) => <option id={s.id}>{s.name}</option>)}
          </Form.Select>
          {mainSpecialty && <SubSpecialties id={mainSpecialty} /> }
        </Form.Group>
        {/* <Transportation /> */}
        <Button variant="success" type="submit">
          ثبت درخواست
        </Button>
      </Form>
    </Container>
  );
};

const SubSpecialties = ({ id }) => {
  const [specialtyList, setSpecialityList] = useState();
  const { data, error, loading } = useFetch(
    urls.speciality.getChildren(id),
    "GET"
  );
  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_RIGHT });
    }
    setSpecialityList(data);
  }, [error, data]);

  return (
    <>
      <Form.Label>نوع تخصص</Form.Label>
      <Form.Select>
        {specialtyList &&
          specialtyList.map((s) => <option id={s.id}>{s.name}</option>)}
      </Form.Select>
    </>
  );
};
export default ServiceRequest;
