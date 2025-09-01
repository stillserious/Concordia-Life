import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Trash2, Calendar, Clock, User, Phone, Mail, MapPin } from "lucide-react";
import { Input, DatePicker, TimePicker, Button, Form, Card, Typography, Space, Row, Col } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgressBar from '@/components/ui/progress-bar';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

const { Title, Text } = Typography;

export default function ClaimVehicleACAntD() {
  const [, setLocation] = useLocation();
  const [form] = Form.useForm();

  // Przewiń do góry po załadowaniu komponentu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dayjs.locale('pl');
  }, []);

  const handleSubmit = (values: any) => {
    console.log('Dane formularza:', values);
    // Przejdź do następnego kroku
    setLocation("/claim/vehicle/ac/incident-type");
  };

  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      <ProgressBar 
        currentStep={2} 
        totalSteps={8} 
        stepLabels={["Wybór ubezpieczenia", "Podstawowe dane", "Typ zdarzenia", "Szczegóły zdarzenia", "Dane pojazdu", "Informacje o zdarzeniu", "Uszkodzenia pojazdu", "Dokumenty"]} 
        stepRoutes={["/claim/vehicle", "/claim/vehicle/ac", "/claim/vehicle/ac/incident-type", "/claim/vehicle/ac/collision-vehicle", "/claim/vehicle/ac/vehicle-data", "/claim/vehicle/ac/incident-info", "/claim/vehicle/ac/damage", "/claim/vehicle/ac/documents"]}
      />
      <main className="flex-1 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 category-icon-vehicles rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">AC</span>
              </div>
              <div>
                <Title level={2} className="!mb-0">Moje ubezpieczenie</Title>
                <Text type="secondary">
                  Zgłaszasz szkodę z ubezpieczenia autocasco.
                </Text>
              </div>
            </div>
          </div>

          <Card className="insurance-card">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
              requiredMark={false}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Imię i nazwisko"
                    name="fullName"
                    rules={[{ required: true, message: 'To pole jest wymagane' }]}
                  >
                    <Input 
                      size="large"
                      prefix={<UserOutlined />}
                      placeholder="Wpisz imię i nazwisko"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Numer telefonu"
                    name="phone"
                    rules={[{ required: true, message: 'To pole jest wymagane' }]}
                  >
                    <Input 
                      size="large"
                      prefix={<PhoneOutlined />}
                      placeholder="np. +48 123 456 789"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Adres e-mail"
                    name="email"
                    rules={[
                      { required: true, message: 'To pole jest wymagane' },
                      { type: 'email', message: 'Podaj poprawny adres e-mail' }
                    ]}
                  >
                    <Input 
                      size="large"
                      prefix={<MailOutlined />}
                      placeholder="twoj@email.pl"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Miasto"
                    name="city"
                    rules={[{ required: true, message: 'To pole jest wymagane' }]}
                  >
                    <Input 
                      size="large"
                      prefix={<EnvironmentOutlined />}
                      placeholder="np. Warszawa"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Data zdarzenia"
                    name="incidentDate"
                    rules={[{ required: true, message: 'To pole jest wymagane' }]}
                  >
                    <DatePicker
                      size="large"
                      style={{ width: '100%' }}
                      placeholder="Wybierz datę"
                      format="DD.MM.YYYY"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Godzina zdarzenia"
                    name="incidentTime"
                    rules={[{ required: true, message: 'To pole jest wymagane' }]}
                  >
                    <TimePicker
                      size="large"
                      style={{ width: '100%' }}
                      placeholder="Wybierz godzinę"
                      format="HH:mm"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <Button
                  type="default"
                  size="large"
                  icon={<Trash2 size={18} />}
                  onClick={() => form.resetFields()}
                  className="mb-4 sm:mb-0"
                >
                  Wyczyść formularz
                </Button>

                <Space>
                  <Button
                    type="default"
                    size="large"
                    onClick={() => setLocation("/claim/vehicle")}
                  >
                    Wstecz
                  </Button>
                  
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Dalej
                  </Button>
                </Space>
              </div>
            </Form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}