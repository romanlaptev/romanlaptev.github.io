<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>

  <xsl:template match="categories">
    <select>
      <option value="0">Корневая категория</option>
      <xsl:apply-templates select="//category"/>
    </select>
  </xsl:template>
  
  <xsl:template match="category">
    <option value="{@id}">
      <xsl:value-of select="@title"/>
    </option>
  </xsl:template>
</xsl:stylesheet>
