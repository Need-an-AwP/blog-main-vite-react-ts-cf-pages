import React, { useEffect, useState, useRef } from 'react';

const GithubSnake: React.FC = () => {
  const [svgContent, setSvgContent] = useState<string>('');
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://need-an-awp.github.io/contribution-snake/snake.svg')
      .then(response => response.text())
      .then(data => {
        setSvgContent(data);
      })
      .catch(error => console.error('加载SVG失败:', error));
  }, []);

  useEffect(() => {
    if (svgRef.current) {
      const svgElement = svgRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', 'auto');
        // 重新触发动画
        svgElement.querySelectorAll('*').forEach((element) => {
          element.getBoundingClientRect();
        });
      }
    }
  }, [svgContent]);

  return (
    <div ref={svgRef} className="github-snake" dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default GithubSnake;