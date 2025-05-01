
interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="py-12 md:py-16 text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
      {description && (
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
