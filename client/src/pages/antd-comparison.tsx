import { Card, Typography, Space, Row, Col, Button } from 'antd';
import { Link } from "wouter";

const { Title, Text } = Typography;

export default function AntDComparisonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <Title level={1}>Porównanie: Material UI vs Ant Design</Title>
          <Text type="secondary" className="text-lg">
            Zobacz jak wyglądają te same formularze w różnych bibliotekach UI
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="🎨 Material UI (Aktualny)" className="h-full">
              <Space direction="vertical" size="large" className="w-full">
                <div>
                  <Text strong>Cechy Material UI:</Text>
                  <ul className="mt-2 space-y-1">
                    <li>• Design system Google Material</li>
                    <li>• Komponenty TextField, DatePicker</li>
                    <li>• Integracja z react-hook-form</li>
                    <li>• Customowy styling potrzebny</li>
                    <li>• Więcej konfiguracji</li>
                  </ul>
                </div>
                <Button type="primary" size="large" className="w-full bg-blue-600">
                  <Link href="/claim/vehicle/ac">
                    Zobacz Material UI formularz
                  </Link>
                </Button>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="🐜 Ant Design (Nowy)" className="h-full">
              <Space direction="vertical" size="large" className="w-full">
                <div>
                  <Text strong>Cechy Ant Design:</Text>
                  <ul className="mt-2 space-y-1">
                    <li>• Gotowy design system</li>
                    <li>• Wszystkie komponenty w jednej bibliotece</li>
                    <li>• Wbudowane ikony i walidacja</li>
                    <li>• Spójny wygląd "out of the box"</li>
                    <li>• Mniej customowego CSS</li>
                  </ul>
                </div>
                <Button type="primary" size="large" className="w-full">
                  <Link href="/claim/vehicle/ac-antd">
                    Zobacz Ant Design formularz
                  </Link>
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>

        <Card className="mt-8">
          <Title level={3}>Główne różnice:</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <div className="text-center">
                <Title level={4} type="success">✅ Ant Design</Title>
                <ul className="text-left space-y-2">
                  <li>• Gotowe komponenty z ikonami</li>
                  <li>• Spójny design system</li>
                  <li>• Mniej kodu CSS</li>
                  <li>• Wbudowana walidacja</li>
                </ul>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="text-center">
                <Title level={4} type="warning">⚖️ Material UI</Title>
                <ul className="text-left space-y-2">
                  <li>• Więcej customizacji</li>
                  <li>• Google Design Language</li>
                  <li>• Większa elastyczność</li>
                  <li>• Więcej konfiguracji</li>
                </ul>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="text-center">
                <Title level={4}>🎯 Rekomendacja</Title>
                <Text>
                  Ant Design może uprościć development i zapewnić bardziej spójny wygląd
                  aplikacji ubezpieczeniowej.
                </Text>
              </div>
            </Col>
          </Row>
        </Card>

        <div className="text-center mt-8">
          <Link href="/">
            <Button size="large">Wróć do strony głównej</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}