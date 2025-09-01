import { useState, useEffect } from 'react';
import simpleCar from '../assets/simple-car.svg';

interface InteractiveCarSVGProps {
  selectedParts: Set<string>;
  onPartSelect: (partName: string) => void;
}

export default function InteractiveCarSVG({ selectedParts, onPartSelect }: InteractiveCarSVGProps) {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    // Pobierz treść SVG
    fetch(simpleCar)
      .then(response => response.text())
      .then(content => {
        setSvgContent(content);
      });
  }, []);

  useEffect(() => {
    // Dodaj nasłuchiwacze kliknięć dla wszystkich części samochodu
    const carParts = document.querySelectorAll('.car-part');
    
    const handlePartClick = (event: Event) => {
      const target = event.target as SVGElement;
      const partId = target.id;
      if (partId) {
        onPartSelect(partId);
      }
    };

    carParts.forEach(part => {
      part.addEventListener('click', handlePartClick);
    });

    return () => {
      carParts.forEach(part => {
        part.removeEventListener('click', handlePartClick);
      });
    };
  }, [onPartSelect, svgContent]);

  useEffect(() => {
    // Aktualizuj klasy CSS dla zaznaczonych części
    const carParts = document.querySelectorAll('.car-part');
    carParts.forEach(part => {
      const partId = (part as SVGElement).id;
      if (selectedParts.has(partId)) {
        part.classList.add('selected');
      } else {
        part.classList.remove('selected');
      }
    });
  }, [selectedParts]);

  return (
    <div 
      className="w-full max-w-4xl mx-auto"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}