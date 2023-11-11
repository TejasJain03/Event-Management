/* eslint-disable react/prop-types */
const Section = ({ id,title, content, buttonText, onClick }) => (
  <div className="bg-background h-auto lg:h-auto my-10 lg:mx-4 hover:mx-4 duration-300 rounded-3xl" id={id}>
    <div className="flex flex-col p-6">
      <h1 className="text-4xl p-2 border-b-2 border-darkBlue">{title}</h1>
      <p className="p-2 text-xl">{content}</p>
      {buttonText && (
        <button
          className="p-3 rounded-lg w-48 font-bold bg-darkBlue text-white "
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  </div>
);

export default Section;
